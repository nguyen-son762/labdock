const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium, expect } = require(`${process.env.QA_PLAYWRIGHT_PATH || "playwright"}/test`);
const siteUrl = process.env.SITE_URL;
if (!siteUrl) throw new Error("Set SITE_URL to the local products page URL.");

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  try {
    for (const [width, height] of [
      [1440, 900],
      [1280, 800],
      [768, 1024],
      [390, 844],
      [320, 720],
    ]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text().slice(0, 300));
      });
      const url = new URL(siteUrl);
      url.searchParams.set("origins", "SG");
      url.searchParams.set("page", "3");
      url.searchParams.set("sort", "name");
      const response = await page.goto(url.href, { waitUntil: "load" });
      assert.equal(response.status(), 200);
      const group = page.getByRole("group", { name: "Origin", exact: true });
      const input = page.getByRole("textbox", { name: "Search origins" });
      const checkbox = page.getByRole("checkbox", { name: "SG", exact: true });
      await expect(checkbox).toBeChecked();
      await expect(checkbox).toBeEnabled();
      await expect(page.getByRole("radiogroup", { name: "Categories" })).toHaveCount(0);
      await page.evaluate(() => document.fonts.ready);
      await group.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          group.locator("img").evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)),
        )
        .toBe(true);
      const metrics = await group.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const input = el.querySelector("input");
        const control = el.querySelector("[role=checkbox]");
        const label = el.querySelector("label");
        const styles = getComputedStyle(input);
        return {
          bounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          overflow: document.documentElement.scrollWidth > innerWidth,
          inputHeight: input.getBoundingClientRect().height,
          inputRadius: styles.borderRadius,
          inputBorderColor: styles.borderColor,
          placeholderColor: getComputedStyle(input, "::placeholder").color,
          labelSize: getComputedStyle(label).fontSize,
          labelLineHeight: getComputedStyle(label).lineHeight,
          checkboxWidth: control.getBoundingClientRect().width,
          assets: [...el.querySelectorAll("img")].map((img) => ({
            src: img.getAttribute("src"),
            width: img.width,
            height: img.height,
            loaded: img.complete && img.naturalWidth > 0,
          })),
        };
      });
      assert.equal(metrics.inputHeight, 40);
      assert.equal(metrics.inputRadius, "8px");
      assert.equal(metrics.inputBorderColor, "rgb(221, 226, 232)");
      assert.equal(metrics.placeholderColor, "rgb(177, 186, 200)");
      assert.equal(metrics.labelSize, "14px");
      assert.equal(metrics.checkboxWidth, 16);
      assert.equal(metrics.overflow, false);
      await group.screenshot({ path: path.join(__dirname, `${width}-origin.png`), animations: "disabled" });
      await page.screenshot({ path: path.join(__dirname, `${width}.png`), fullPage: true, animations: "disabled" });
      await input.fill("unknown-origin");
      await expect(group.getByRole("status")).toHaveText("No matching origins.");
      await input.fill("");
      await input.focus();
      await page.keyboard.press("Tab");
      await expect(checkbox).toBeFocused();
      await page.keyboard.press("Space");
      await expect(page).toHaveURL(/sort=name$/);
      await expect(checkbox).not.toBeChecked();
      const updatedUrl = new URL(page.url());
      assert.equal(updatedUrl.searchParams.has("origins"), false);
      assert.equal(updatedUrl.searchParams.has("page"), false);
      await checkbox.click();
      await expect(checkbox).toBeChecked();
      await expect(page).toHaveURL(/origins=SG/);
      await page.getByRole("button", { name: "Clear", exact: true }).click();
      await expect(page).toHaveURL(siteUrl);
      await expect(checkbox).not.toBeChecked();
      results.push({ viewport: { width, height }, metrics, errors, interactions: "passed" });
      await context.close();
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(__dirname, "measurements.json"), JSON.stringify(results, null, 2));
  }
  console.log(
    JSON.stringify(
      results.map((r) => ({
        viewport: r.viewport,
        overflow: r.metrics.overflow,
        errors: r.errors,
        interactions: r.interactions,
      })),
      null,
      2,
    ),
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
