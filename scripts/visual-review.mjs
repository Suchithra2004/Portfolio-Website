import { writeFile } from 'node:fs/promises';
import { openBrowser } from './browser.mjs';
import { projects } from '../src/components.mjs';
const browser = await openBrowser();
const captureStyle = '.site-header, .skip-link { visibility: hidden !important; }';
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    window.layoutShift = 0;
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.layoutShift += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('http://localhost:4173/');
  await page.evaluate(() => document.fonts.ready);
  const performance = await page.evaluate(() => ({
    fonts: [...document.fonts].map(f => ({ family: f.family, weight: f.weight, status: f.status })),
    layoutShift: window.layoutShift,
    resources: window.performance.getEntriesByType('resource').map(r => ({ name: r.name, bytes: r.decodedBodySize })),
  }));
  for (const width of [1440, 768, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:4173/');
    for (const selector of ['.project-primary', '.project-secondary', '.supporting-projects', '.experience-section']) {
      const element = page.locator(selector);
      if (await element.count()) await element.screenshot({ path: `.qa/detail-${selector.slice(1)}-${width}.png`, style: captureStyle });
    }
  }
  for (const project of projects) {
    for (const width of [1440, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`http://localhost:4173/work/${project.slug}/`);
      await page.locator('.case-hero').screenshot({ path: `.qa/detail-${project.slug}-hero-${width}.png`, style: captureStyle });
      await page.locator('#prioritization').screenshot({ path: `.qa/detail-${project.slug}-table-${width}.png`, style: captureStyle });
    }
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('http://localhost:4173/prototype/');
  await page.locator('.device').first().screenshot({ path: '.qa/detail-prototype-320.png' });
  const missing = await page.goto('http://localhost:4173/does-not-exist/');
  performance.notFoundStatus = missing.status();
  await writeFile('.qa/performance.json', JSON.stringify(performance, null, 2));
  console.log(JSON.stringify(performance, null, 2));
} finally { await browser.close(); }
