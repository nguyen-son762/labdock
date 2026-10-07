const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || 'playwright');

async function main() {
  const output = path.join(__dirname, process.env.QA_PHASE || 'before');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const [width, height] of [[1440,900],[1280,800],[768,1024],[390,844],[320,720]]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      const consoleErrors = [];
      const failedRequests = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text().slice(0,300)); });
      page.on('requestfailed', request => failedRequests.push({path:new URL(request.url()).pathname,error:request.failure()?.errorText}));
      const response = await page.goto('http://localhost:3000/', { waitUntil: 'load' });
      await page.getByRole('heading', { level: 1 }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(el => el.complete ? undefined : new Promise(resolve => {
          el.addEventListener('load', resolve, { once: true });
          el.addEventListener('error', resolve, { once: true });
        }));
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: path.join(output, `${width}.png`), fullPage: true, animations: 'disabled' });
      await page.screenshot({ path: path.join(output, `${width}-top.png`), animations: 'disabled' });
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headerControls: [...document.querySelectorAll('header a,header button')].filter(el=>el.getBoundingClientRect().width>0).map(el=>({name:el.getAttribute('aria-label')||el.textContent.trim(), x:el.getBoundingClientRect().x,right:el.getBoundingClientRect().right})),
        headings: [...document.querySelectorAll('h1,h2')].map(el => ({ text: el.textContent, x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height, fontSize: getComputedStyle(el).fontSize })),
        brokenImages: [...document.images].filter(el => el.complete && !el.naturalWidth).map(el => ({alt:el.alt,src:el.getAttribute('src')})),
        categoryLinks: [...document.querySelectorAll('[id^="category-"]')].map(el=>el.getAttribute('href')),
        unnamedControls: [...document.querySelectorAll('button,input')].filter(el => el.getBoundingClientRect().width > 0 && !(el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.labels?.length)).map(el=>el.outerHTML.slice(0,220)),
      }));
      results.push({ width, height, status: response.status(), errors, consoleErrors, failedRequests, ...metrics });
      await context.close();
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'measurements.json'), JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
