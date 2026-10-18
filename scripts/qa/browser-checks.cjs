// Run against the local synthetic API only. This is frontend browser coverage, not backend E2E.
const fs = require("node:fs/promises");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || "playwright");
const baseURL = process.env.QA_BASE_URL || "http://localhost:3100";
const output = process.env.QA_OUTPUT_DIR || ".qa/test-cases/execution/browser";
const results = [];
(async () => {
  await fs.mkdir(output, { recursive: true });
  await fs.rm(path.join(output, "results.json"), { force: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.QA_CHROME_PATH ? { executablePath: process.env.QA_CHROME_PATH } : {}),
  });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    const page = await context.newPage();
    const health = await page.request.get(baseURL);
    if (health.status() !== 200) throw new Error(`Application preflight failed: ${health.status()}`);
    page.setDefaultTimeout(8000);
    page.setDefaultNavigationTimeout(20000);
    const runtimeErrors = [];
    const hydrationMessages = [];
    page.on("console", (message) => {
      if (
        ["error", "warning", "warn"].includes(message.type()) &&
        /hydrat|did not match|Minified React error #42[0-5]|Minified React error #418/i.test(message.text())
      )
        hydrationMessages.push(message.text());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    const test = async (ids, name, run) => {
      try {
        await run();
        results.push({ ids, name, status: "Pass" });
      } catch (error) {
        const evidence = `${results.length + 1}-failure.png`;
        await page.screenshot({ path: path.join(output, evidence), fullPage: true }).catch(() => undefined);
        results.push({ ids, name, status: "Fail", actual: error.message.slice(0, 1000), evidence });
      }
      await fs.writeFile(path.join(output, "progress.json"), JSON.stringify(results, null, 2));
      process.stdout.write(`${results.at(-1).status}: ${name}\n`);
    };
    const home = async () => {
      await context.addCookies([{ name: "NEXT_LOCALE", value: "en", url: baseURL }]);
      return page.goto(baseURL, { waitUntil: "networkidle" });
    };
    const leaders = () => page.locator('.swiper[aria-label*="Research Leaders"]');
    await test(["SYS-022"], "Production security response headers", async () => {
      const response = await home();
      assert.equal(response.status(), 200);
      const headers = response.headers();
      assert.equal(headers["x-frame-options"], "DENY");
      assert.equal(headers["x-content-type-options"], "nosniff");
      assert.match(headers["permissions-policy"], /camera=\(\)/);
    });
    await test(["UI-014"], "Home content carousels enable autoplay", async () => {
      await page.waitForFunction(
        () =>
          [...document.querySelectorAll(".swiper")].length >= 5 &&
          [...document.querySelectorAll(".swiper")].every((element) => element.swiper?.initialized),
      );
      const carousels = await page.locator(".swiper").evaluateAll((elements) =>
        elements.map((element) => ({
          label: element.getAttribute("aria-label"),
          enabled: element.swiper.params.autoplay.enabled,
          running: element.swiper.autoplay.running,
          locked: element.swiper.isLocked,
        })),
      );
      assert(
        carousels.every((item) => item.enabled && (item.locked || item.running)),
        JSON.stringify(carousels),
      );
      assert.equal(await page.locator("[data-carousel-playback]").count(), 0);
    });
    await test(["HOME-012"], "Mobile autoplay advances and keyboard next/back remains available", async () => {
      await leaders().scrollIntoViewIfNeeded();
      const initial = await leaders().evaluate((element) => element.swiper.activeIndex);
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.activeIndex !== index,
        initial,
        { timeout: 7500 },
      );
      const controls = leaders().locator("..");
      const before = await leaders().evaluate((element) => element.swiper.activeIndex);
      await controls.getByRole("button", { name: /Next / }).press("Enter");
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.activeIndex !== index,
        before,
      );
      await page.waitForFunction(
        () => !document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.animating,
      );
      await controls.getByRole("button", { name: /Previous / }).press("Enter");
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.activeIndex === index,
        before,
      );
      assert.equal(await leaders().evaluate((element) => element.swiper.autoplay.running), true);
    });
    await test(["HOME-012"], "Manual mobile swipe retains autoplay", async () => {
      assert.equal(await leaders().evaluate((element) => element.swiper.autoplay.running), true);
      await leaders().scrollIntoViewIfNeeded();
      await page.waitForFunction(
        () => !document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.animating,
      );
      const box = await leaders().boundingBox();
      assert(box);
      const before = await leaders().evaluate((element) => element.swiper.activeIndex);
      const client = await context.newCDPSession(page);
      const y = box.y + box.height / 2;
      await client.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: box.x + box.width * 0.8, y }],
      });
      for (let step = 1; step <= 8; step += 1)
        await client.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [{ x: box.x + box.width * (0.8 - step * 0.075), y }],
        });
      await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.activeIndex !== index,
        before,
      );
      await client.detach();
      assert.equal(await leaders().evaluate((element) => element.swiper.autoplay.running), true);
    });
    await test(["HOME-013"], "Research Leaders changes to 3/6 columns at documented breakpoints", async () => {
      for (const [width, columns] of [
        [640, 3],
        [1024, 6],
      ]) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForFunction((count) => {
          const element = document.querySelector('.swiper[aria-label*="Research Leaders"]');
          return (
            !element.swiper.enabled &&
            getComputedStyle(element.querySelector(".swiper-wrapper")).gridTemplateColumns.split(" ").length === count
          );
        }, columns);
        assert.equal(await leaders().evaluate((element) => element.swiper.autoplay.running), false);
      }
      await page.setViewportSize({ width: 639, height: 844 });
      await page.waitForFunction(
        () => document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.enabled,
      );
      assert.equal(
        await leaders().evaluate((element) => element.swiper.autoplay.running),
        true,
        "Autoplay must restart when returning to the mobile carousel",
      );
    });
    await test(["UI-019"], "Desktop collections do not autoplay when all slides fit", async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const collections = page.locator('.swiper[aria-label="Featured laboratory collections"]');
      await page.waitForFunction(
        () =>
          document.querySelector('.swiper[aria-label="Featured laboratory collections"]').swiper.params
            .slidesPerView === 3,
      );
      assert.equal(await collections.evaluate((element) => element.swiper.autoplay.running), false);
    });
    await test(["LOC-006"], "Vietnamese HTML language is correct before hydration", async () => {
      const response = await page.request.get(`${baseURL}/vi`);
      assert.match(await response.text(), /<html[^>]*lang="vi"/);
    });
    await test(["LOC-001"], "Vietnamese auth links retain the locale prefix", async () => {
      await page.goto(`${baseURL}/vi/login`, { waitUntil: "networkidle" });
      assert.equal(await page.locator('a[href="/vi/forgot-password"]').count(), 1);
      assert.equal(await page.locator('a[href="/vi/signup"]').count(), 1);
    });
    await test(["PDP-017", "UI-015"], "Product gallery uses API images, autoplay and thumbnail controls", async () => {
      await context.addCookies([{ name: "NEXT_LOCALE", value: "en", url: baseURL }]);
      await page.goto(`${baseURL}/products/qa-product-1`, { waitUntil: "networkidle" });
      const gallery = page.getByRole("region", { name: "QA Product 1 gallery" });
      const main = gallery.locator(".swiper").last();
      assert.equal(await main.evaluate((element) => element.swiper.params.autoplay.enabled), true);
      const initial = await main.evaluate((element) => element.swiper.activeIndex);
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="product images"]').swiper.activeIndex !== index,
        initial,
        { timeout: 7500 },
      );
      await gallery.getByRole("button", { name: "View product image 2" }).focus();
      await gallery.getByRole("button", { name: "View product image 2" }).click();
      await page.waitForFunction(
        () =>
          [...document.querySelectorAll(".swiper")].find((element) =>
            element.getAttribute("aria-label")?.includes("product images"),
          )?.swiper.activeIndex === 1,
      );
      assert.equal(
        await gallery.getByRole("button", { name: "View product image 2" }).getAttribute("aria-pressed"),
        "true",
      );
      assert.equal(await main.evaluate((element) => element.swiper.autoplay.running), true);
      assert.equal(await gallery.locator("[data-carousel-playback]").count(), 0);
    });
    await test(["UI-014", "UI-015"], "Gallery autoplay continues while hovering or focusing thumbnails", async () => {
      const gallery = page.getByRole("region", { name: "QA Product 1 gallery" });
      await page.getByRole("button", { name: "View product image 1" }).focus();
      const main = gallery.locator(".swiper").last();
      await main.hover();
      const initial = await main.evaluate((element) => element.swiper.activeIndex);
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="product images"]').swiper.activeIndex !== index,
        initial,
        { timeout: 7500 },
      );
      assert.equal(await main.evaluate((element) => element.swiper.autoplay.running), true);
    });
    await test(["SEO-005", "SEO-006"], "SSR product offer matches the promotional price", async () => {
      const json = await page.locator('script[type="application/ld+json"]').allTextContents();
      const product = json.map((value) => JSON.parse(value)).find((value) => value["@type"] === "Product");
      assert.equal(product.offers.price, 89.55);
      assert.equal(product.offers.priceCurrency, "SGD");
    });
    await test(["CHK-002"], "Repeated checkout selection query does not crash SSR", async () => {
      const response = await page.goto(`${baseURL}/checkout?items=I1&items=I2`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      assert(await page.getByRole("heading", { name: "Your cart is empty" }).isVisible());
    });
    await test(["SEO-008"], "Public product content is visible with JavaScript disabled", async () => {
      const noJS = await browser.newContext({ javaScriptEnabled: false });
      const document = await noJS.newPage();
      await document.goto(`${baseURL}/products/qa-product-1`, { waitUntil: "domcontentloaded" });
      assert(await document.getByRole("heading", { name: "QA Product 1", exact: true }).isVisible());
      assert(await document.locator("noscript p").isVisible());
      for (const route of ["/", "/products", "/news", "/about-us", "/privacy", "/terms-and-conditions"]) {
        const response = await document.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" });
        assert.equal(response.status(), 200, route);
        assert(await document.getByRole("heading", { level: 1 }).first().isVisible(), route);
      }
      await noJS.close();
    });
    await test(["UI-019"], "A single catalog category keeps navigation and autoplay inactive", async () => {
      await page.goto(`${baseURL}/products`, { waitUntil: "networkidle" });
      const category = page.locator('.swiper[aria-label="Product categories carousel"]');
      await category.waitFor();
      const state = await category.evaluate((element) => ({
        count: element.swiper.slides.length,
        locked: element.swiper.isLocked,
        running: element.swiper.autoplay.running,
      }));
      assert.equal(state.count, 1);
      assert.equal(state.locked, true);
      assert.equal(state.running, false);
    });
    await test(["UI-018"], "Reduced motion shortens transitions and retains autoplay/navigation", async () => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: 390, height: 844 });
      await home();
      const controls = leaders().locator("..");
      assert.equal(await leaders().evaluate((element) => element.swiper.autoplay.running), true);
      const before = await leaders().evaluate((element) => element.swiper.activeIndex);
      await controls.getByRole("button", { name: /Next / }).click();
      await page.waitForFunction(
        (index) => document.querySelector('.swiper[aria-label*="Research Leaders"]').swiper.activeIndex !== index,
        before,
      );
      const duration = await leaders()
        .locator(".swiper-wrapper")
        .evaluate((element) => getComputedStyle(element).transitionDuration);
      assert(parseFloat(duration) < 0.02, duration);
      await page.emulateMedia({ reducedMotion: "no-preference" });
    });
    await test(
      ["SEO-003", "SEO-004"],
      "Sitemap uses unique public URLs that resolve in the fixture environment",
      async () => {
        const response = await page.request.get(`${baseURL}/sitemap.xml`);
        assert.equal(response.status(), 200);
        const xml = await response.text();
        const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"));
        assert(urls.length > 20);
        assert.equal(new Set(urls).size, urls.length);
        assert(urls.every((url) => !/\/(cart|checkout|profile|orders|rfqs)(\/|$)/.test(url)));
        for (let start = 0; start < urls.length; start += 6) {
          const checks = await Promise.all(
            urls.slice(start, start + 6).map(async (url) => ({ url, status: (await page.request.get(url)).status() })),
          );
          assert(
            checks.every((check) => check.status === 200),
            JSON.stringify(checks.filter((check) => check.status !== 200)),
          );
        }
      },
    );
    await test(["SYS-024"], "Browser has no uncaught application or hydration errors", async () =>
      assert.deepEqual(runtimeErrors, []),
    );
    await page.screenshot({ path: path.join(output, "final-page.png"), fullPage: true });
    await fs.writeFile(
      path.join(output, "results.json"),
      JSON.stringify(
        {
          baseURL,
          browser: browser.version(),
          environment: "Synthetic local API; no real payment, OTP, email or persistence",
          observedRuntimeErrors: runtimeErrors,
          observedHydrationMessages: hydrationMessages,
          results,
        },
        null,
        2,
      ),
    );
    process.exitCode = results.some((item) => item.status === "Fail") ? 1 : 0;
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
