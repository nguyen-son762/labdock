const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || "playwright");
async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  try {
    for (const [width, height] of [
      [1440, 900],
      [768, 1024],
      [390, 844],
      [320, 720],
    ]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
      await page.goto("http://localhost:3000/", { waitUntil: "load" });
      const section = page.getByRole("region", { name: "Trusted by 500+ Research Leaders" });
      await section.waitFor();
      await section.locator(".swiper-initialized").waitFor();
      await section.scrollIntoViewIfNeeded();
      if (width < 640) await section.getByRole("button", { name: "Pause autoplay", exact: true }).click();
      else assert.equal(await section.locator(".swiper").evaluate((el) => el.swiper.autoplay.running), false);
      const images = section.getByRole("img");
      assert.equal(await images.count(), 12);
      await page.waitForFunction(() =>
        [...document.querySelectorAll("#research-leaders img")].every((img) => img.complete && img.naturalWidth > 0),
      );
      const measurements = await section.evaluate((el) => ({
        width: el.clientWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        columns: getComputedStyle(el.querySelector("ul")).gridTemplateColumns,
        cards: [...el.querySelectorAll("li")].map((card) => ({
          width: card.getBoundingClientRect().width,
          height: card.getBoundingClientRect().height,
        })),
        logos: [...el.querySelectorAll("img")].map((img) => ({
          name: img.alt,
          src: img.getAttribute("src"),
          width: img.getBoundingClientRect().width,
          height: img.getBoundingClientRect().height,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        })),
      }));
      assert.equal(measurements.overflow, false);
      for (const card of measurements.cards) assert.equal(card.height, 100);
      for (const logo of measurements.logos) {
        assert.match(logo.src, /^\/home\/research-leaders\/.+\.svg$/);
        assert.equal(logo.height, 32);
        assert.ok(logo.width > 0);
        assert.ok(fs.statSync(path.join(process.cwd(), "public", logo.src)).size > 0);
      }
      if (width === 1440) {
        assert.equal(measurements.columns.split(" ").length, 6);
        await section.getByRole("img", { name: "Stack&d Lab", exact: true }).hover();
      }
      await section.screenshot({ path: path.join(__dirname, `${width}.png`), animations: "disabled" });
      if (width < 640) {
        const settle = () =>
          page.waitForFunction(() => !document.querySelector("#research-leaders .swiper").swiper.animating);
        const previous = section.getByRole("button", { name: "Previous Trusted by 500+ Research Leaders" });
        const next = section.getByRole("button", { name: "Next Trusted by 500+ Research Leaders" });
        assert.equal(await previous.isEnabled(), false);
        assert.equal(await next.isEnabled(), true);
        await next.press("Enter");
        await settle();
        await page.waitForFunction(
          () => !document.querySelector('#research-leaders button[aria-label^="Previous"]').disabled,
        );
        await previous.click();
        await settle();
        await page.waitForFunction(
          () => document.querySelector('#research-leaders button[aria-label^="Previous"]').disabled,
        );
        const box = await section.locator(".swiper").boundingBox();
        await page.mouse.move(box.x + box.width - 20, box.y + 50);
        await page.mouse.down();
        await page.mouse.move(box.x + 20, box.y + 50, { steps: 10 });
        await page.mouse.up();
        await settle();
        await page.waitForFunction(
          () => !document.querySelector('#research-leaders button[aria-label^="Previous"]').disabled,
        );
        for (let index = 0; index < 12 && (await next.isEnabled()); index++) {
          await next.click();
          await settle();
        }
        await page.waitForFunction(
          () => document.querySelector('#research-leaders button[aria-label^="Next"]').disabled,
        );
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.waitForFunction(() => {
          const style = getComputedStyle(document.querySelector("#research-leaders ul"));
          return style.display === "grid" && style.transform === "none";
        });
        assert.equal(await next.isVisible(), false);
        assert.equal(await section.locator("ul").evaluate((el) => getComputedStyle(el).transform), "none");
        assert.equal(await section.locator(".swiper").evaluate((el) => el.swiper.autoplay.running), false);
        await page.setViewportSize({ width, height });
        await section.getByRole("button", { name: "Resume autoplay", exact: true }).click();
        const initial = await section.locator(".swiper").evaluate((el) => el.swiper.activeIndex);
        await page.waitForFunction(
          (index) => document.querySelector("#research-leaders .swiper").swiper.activeIndex !== index,
          initial,
          { timeout: 8000 },
        );
        await section.getByRole("button", { name: "Pause autoplay", exact: true }).click();
        assert.equal(await section.locator(".swiper").evaluate((el) => el.swiper.autoplay.running), false);
      } else {
        assert.equal(
          await section.getByRole("button", { name: "Next Trusted by 500+ Research Leaders" }).isVisible(),
          false,
        );
      }
      results.push({ width, ...measurements });
      await page.close();
    }
    fs.writeFileSync(path.join(__dirname, "measurements.json"), JSON.stringify(results, null, 2));
    console.log(
      JSON.stringify(
        results.map((r) => ({ width: r.width, columns: r.columns, logos: r.logos.length, overflow: r.overflow })),
      ),
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
