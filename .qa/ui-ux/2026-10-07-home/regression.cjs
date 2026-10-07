const assert = require('node:assert/strict');
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const failures = [];
  try {
    for (const width of [1440,1280,768,390,320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await page.clock.install();
      await page.goto('http://localhost:3000/', { waitUntil: 'load' });
      await page.getByRole('heading', { level: 1 }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      const links = await page.locator('[id^="category-"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
      try {
        assert.ok(links.length > 0, 'Homepage categories must be loaded for this live-data regression');
        assert.ok(links.every(href=>href.startsWith('/products/category/')), 'Homepage categories target the implemented catalog route');
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth), false, 'No horizontal page overflow');
        const clipped = await page.locator('header a, header button').evaluateAll(els => els.filter(el => {
          const box = el.getBoundingClientRect();
          return box.width > 0 && (box.x < 0 || box.right > innerWidth);
        }).map(el=>el.getAttribute('aria-label') || el.textContent.trim()));
        assert.deepEqual(clipped, [], `Header controls clipped at ${width}: ${clipped.join(', ')}`);
        const trigger = page.getByRole('button', { name: width >= 1380 ? 'All Categories' : 'Open categories', exact: true });
        await trigger.focus();
        await trigger.press('Enter');
        await page.getByRole('navigation', { name: 'Product categories', exact: true }).waitFor();
        const menuLinks = await page.getByRole('navigation', { name: 'Product categories', exact: true }).getByRole('link').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
        assert.ok(menuLinks.length > 0 && menuLinks.every(href=>href.startsWith('/products/category/')), 'Header category links filter by the category route');
        await page.keyboard.press('Escape');
        await page.getByRole('navigation', { name: 'Product categories', exact: true }).waitFor({state:'hidden'});
        await page.waitForFunction(el => el === document.activeElement, await trigger.elementHandle());
        assert.equal(await trigger.evaluate(el=>el===document.activeElement), true, 'Escape restores focus to the category trigger');
        if (width === 390) {
          const services = page.getByLabel('Service guarantees carousel', { exact: true });
          await services.scrollIntoViewIfNeeded();
          const visibleHeading = () => services.getByRole('heading').evaluateAll(els=>els.filter(el=>{
            const box=el.getBoundingClientRect();
            return box.left >= 0 && box.right <= innerWidth;
          }).map(el=>el.textContent));
          const before = await visibleHeading();
          assert.ok(before.length > 0, 'Service slide heading is visible');
          await page.clock.runFor(6000);
          assert.notDeepEqual(await visibleHeading(), before, 'Service content auto-advances without interaction');
        }
        if (width === 1440) {
          const box = await page.getByRole('heading',{level:1}).boundingBox();
          assert.ok(Math.abs(box.y - 158) <= 1, `Figma hero top: expected 158, actual ${box.y}`);
          assert.ok(Math.abs(box.width - 433) <= 1, `Figma hero width: expected 433, actual ${box.width}`);
          assert.ok(Math.abs(box.height - 84) <= 1, `Figma hero height: expected 84, actual ${box.height}`);
        }
        console.log(`PASS viewport ${width}`);
      } catch (error) { failures.push(`${width}: ${error.message}`); }
      await page.close();
    }
  } finally { await browser.close(); }
  assert.deepEqual(failures, [], failures.join('\n'));
})().catch(error=>{console.error(error.message);process.exitCode=1;});
