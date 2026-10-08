const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || "playwright");

const fixture = {
  fullName: "QA Profile",
  email: "profile@example.test",
  phoneNumber: "+65 88009900",
  companyName: "QA Company",
  companyPhone: "67073597",
  businessRegistrationNumber: "QA-2026",
  deliveryAddress: { address: "QA address", postalCode: "319455", country: "SG" },
  sameAsDeliveryAddress: true,
  billingAddress: { address: "QA address", postalCode: "319455", country: "SG" },
  profilePictureUrl: null,
  passwordChangedAt: "2026-08-21T10:00:00.000Z",
  memberSince: "2025-01-08T00:00:00.000Z",
};

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  const phase = process.env.QA_PHASE || "before";
  const output = path.join(__dirname, phase, "screenshots");
  fs.mkdirSync(output, { recursive: true });
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
      // Only synthetic profile data; mutations cannot reach the real backend.
      await page.route("**/me/profile", (route) =>
        route.request().method() === "GET" ? route.fulfill({ json: fixture }) : route.abort(),
      );
      await page.route("**/me/profile/media", (route) => route.abort());
      await page.route("**/auth/change-password", (route) => route.abort());
      const response = await page.goto(process.env.QA_SITE_URL || "http://localhost:3000/profile", {
        waitUntil: "load",
      });
      await page.getByRole("heading", { name: fixture.fullName, exact: true }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      const measurements = async (state) => {
        await page.screenshot({
          path: path.join(output, `${width}-${state}.png`),
          fullPage: true,
          animations: "disabled",
        });
        return page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          overflow: document.documentElement.scrollWidth > innerWidth,
          profileBackground: getComputedStyle(document.querySelector("main > div")).backgroundColor,
          cardShadows: [...document.querySelectorAll("main h2")]
            .filter((el) => ["Account information", "Security"].includes(el.textContent))
            .map((el) => ({
              title: el.textContent,
              shadow: getComputedStyle(el.parentElement.parentElement).boxShadow,
            })),
          landmarks: [...document.querySelectorAll("main h1,main h2,main aside,main form,[role=dialog]")].map((el) => {
            const box = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            return {
              tag: el.tagName,
              text: el.matches("h1,h2") ? el.textContent : undefined,
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
              fontSize: style.fontSize,
              fontFamily: style.fontFamily,
            };
          }),
        }));
      };
      const view = await measurements("view");
      if (process.env.QA_ASSERT_FIX === "1") {
        assert.equal(view.profileBackground, "rgb(255, 255, 255)");
        assert.equal(view.cardShadows.length, 2);
        for (const card of view.cardShadows)
          assert.match(
            card.shadow,
            /^(none|rgba\(0, 0, 0, 0\) 0px 0px 0px 0px(?:, rgba\(0, 0, 0, 0\) 0px 0px 0px 0px)*)$/,
            card.title,
          );
      }
      await page.getByRole("button", { name: "Edit", exact: true }).click();
      assert.equal(await page.getByRole("textbox", { name: /Full name/ }).inputValue(), fixture.fullName);
      assert.equal(await page.getByRole("button", { name: "Save changes" }).isEnabled(), false);
      const edit = await measurements("edit");
      await page.getByRole("button", { name: "Cancel", exact: true }).click();
      await page.getByRole("button", { name: "Change password", exact: true }).click();
      await page.getByLabel(/Current password/).waitFor();
      const password = await measurements("password");
      await page.getByRole("button", { name: "Cancel", exact: true }).click();
      const avatarTrigger = page.getByRole("button", { name: "Change profile picture", exact: true });
      await avatarTrigger.click();
      await page.getByRole("dialog").waitFor();
      const avatar = await measurements("avatar");
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "hidden" });
      assert.equal(await avatarTrigger.evaluate((el) => el === document.activeElement), true);
      results.push({
        width,
        height,
        status: response.status(),
        errors,
        view,
        edit,
        password,
        avatar,
        interaction: "passed; no mutations submitted",
      });
      await context.close();
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(__dirname, phase, "measurements.json"), JSON.stringify(results, null, 2));
  }
  console.log(
    JSON.stringify(
      results.map(({ width, status, errors, view, edit, password, avatar }) => ({
        width,
        status,
        errors,
        overflow: { view: view.overflow, edit: edit.overflow, password: password.overflow, avatar: avatar.overflow },
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
