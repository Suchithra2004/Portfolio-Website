import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { openBrowser } from './browser.mjs';
import { serve } from './serve.mjs';

await mkdir('.qa', { recursive: true });
const server = serve(4175);
const browser = await openBrowser();
const checks = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4175/');
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('.hero h1').evaluate(e => getComputedStyle(e).animationName), 'editorial-enter');
  assert.equal(await page.locator('.portrait-frame').evaluate(e => getComputedStyle(e, '::before').animationName), 'portrait-settle');
  await page.locator('.portrait-mask img').evaluate(image => image.decode());
  assert.equal(await page.locator('.portrait-mask').evaluate(e => getComputedStyle(e).borderRadius), '50%');
  await page.evaluate(() => Promise.allSettled(document.getAnimations().map(animation => animation.finished)));
  await page.screenshot({ path: '.qa/enhanced-hero-1440.png' });
  checks.push('Oval portrait loads; staggered hero and portrait-frame entrances finish');

  await page.locator('.hero-actions .button').hover();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-actions .button')).transform !== 'none');
  checks.push('Pointer hover activates button lift');

  await page.locator('.project-secondary').evaluate(e => scrollTo({ top: e.offsetTop - 120, behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('.project-secondary').getAnimations().some(a => a.effect.getTiming().duration === 560));
  await page.locator('.project-secondary h3 a').focus();
  assert.equal(await page.locator('.project-secondary').evaluate(e => e.getAnimations({ subtree: true }).length), 0);
  assert.ok(await page.locator('.site-header').evaluate(e => Number(e.style.getPropertyValue('--reading-progress')) > 0));
  checks.push('Scroll reveal runs; keyboard focus cancels it; reading progress follows position');

  await page.locator('.supporting-projects').evaluate(e => scrollTo({ top: e.offsetTop - 120, behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('.funnel-bar').getAnimations().length > 0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running'));
  assert.equal(await page.locator('.hero h1').evaluate(e => getComputedStyle(e).animationName), 'none');
  assert.equal(await page.locator('.site-header').evaluate(e => getComputedStyle(e, '::after').display), 'none');
  assert.equal(await page.locator('.project-supporting').first().evaluate(e => getComputedStyle(e).opacity), '1');
  checks.push('Changing reduced-motion preference stops active effects and keeps content visible');
  assert.deepEqual(errors, []);
  await writeFile('.qa/motion-results.json', JSON.stringify({ checks, errors }, null, 2));
  console.log(JSON.stringify({ checks, errors }, null, 2));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
