import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { openBrowser } from './browser.mjs';

await mkdir('.qa', { recursive: true });
await mkdir('src/assets/images', { recursive: true });
const browser = await openBrowser();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await page.goto(pathToFileURL(resolve('prototype/index.html')).href);
  await page.locator('[data-rider-next="cancelled"]').click();
  await page.locator('[data-rider-next="rematching"]').click();
  await page.locator('#rider-content').screenshot({ path: '.qa/priority-rematch.png' });
  console.log('Captured the real priority-rematch state → .qa/priority-rematch.png');
} finally { await browser.close(); }
