const assert = require("node:assert/strict");
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || "playwright");

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    for (const width of [390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(process.env.QA_BASE_URL || "http://localhost:3001/", { waitUntil: "load" });
      const section = page.getByRole("region", { name: "Trusted by 500+ Research Leaders" });
      await section.locator(".swiper-initialized").waitFor();
      await section.scrollIntoViewIfNeeded();
      const carousel = section.locator(".swiper");
      const next = section.getByRole("button", { name: "Next Trusted by 500+ Research Leaders" });
      const previous = section.getByRole("button", { name: "Previous Trusted by 500+ Research Leaders" });
      const settle = () =>
        page.waitForFunction(() => !document.querySelector("#research-leaders .swiper").swiper.animating);
      const assertAdvances = async () => {
        assert.equal(await carousel.evaluate((el) => el.swiper.autoplay.running), true);
        const initial = await carousel.evaluate((el) => el.swiper.activeIndex);
        await page.waitForFunction(
          (index) => document.querySelector("#research-leaders .swiper").swiper.activeIndex !== index,
          initial,
          { timeout: 8000 },
        );
        await settle();
      };
      await next.click();
      await settle();
      await assertAdvances();
      await previous.click();
      await settle();
      await assertAdvances();
      await next.press("Enter");
      await settle();
      await assertAdvances();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForFunction(() => !document.querySelector("#research-leaders .swiper").swiper.enabled);
      assert.equal(await carousel.evaluate((el) => el.swiper.autoplay.running), false);
      await page.setViewportSize({ width, height: 844 });
      await page.waitForFunction(() => document.querySelector("#research-leaders .swiper").swiper.enabled);
      await assertAdvances();
      console.log(`${width}px: autoplay continues after Next, Previous, Enter and desktop/mobile resize`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
