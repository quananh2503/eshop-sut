#!/usr/bin/env node
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const report = pathToFileURL(path.join(root, 'results', 'newman-report.html')).href;
const output = path.join(root, 'evidence');

async function capture(needle, filename) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(report, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1500);
  const target = page.getByText(needle, { exact: false }).first();
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  if (!box) throw new Error(`Could not locate evidence text: ${needle}`);
  await page.screenshot({ path: path.join(output, filename), clip: { x: 0, y: Math.max(0, box.y - 260), width: 1440, height: Math.min(900, box.y + 600) } });
  await browser.close();
}

(async () => {
  await capture('password not disclosed', 'BUG-LOGIN-001-newman.png');
  await capture('ordinary user denied', 'BUG-ADMINSTATUS-001-newman.png');
})().catch(error => { console.error(error); process.exit(1); });
