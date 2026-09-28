import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { openBrowser } from './browser.mjs';
import { serve } from './serve.mjs';
import { projects } from '../src/components.mjs';

await mkdir('.qa', { recursive: true });
const server = serve(4174);
const browser = await openBrowser();
const results = { layouts: [], accessibility: [], interactions: [], errors: [] };
const base = 'http://127.0.0.1:4174';
const widths = [1440, 1280, 1024, 768, 390, 320];
const routes = ['/', ...projects.map(p => `/work/${p.slug}/`), '/prototype/'];
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', e => results.errors.push(e.message));
  page.on('console', e => { if (e.type() === 'error') results.errors.push(e.text()); });
  page.on('requestfailed', r => results.errors.push(`${r.url()}: ${r.failure()?.errorText}`));
  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        width: innerWidth,
        h1: document.querySelectorAll('h1').length,
        images: [...document.images].every(i => i.complete && i.naturalWidth > 0),
      }));
      // Scroll each lazy image into view before checking loaded assets.
      for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode()); }
      await page.evaluate(() => scrollTo(0, 0));
      const name = route === '/' ? 'home' : route.split('/').filter(Boolean).at(-1);
      if (route === '/' || width === 1440 || width === 320) {
        await page.screenshot({ path: `.qa/${name}-${width}.png`, fullPage: true });
        if (route === '/') await page.screenshot({ path: `.qa/home-${width}-viewport.png` });
      }
      results.layouts.push({ route, width, scrollWidth: layout.scrollWidth, h1: layout.h1 });
      if (layout.scrollWidth > width) results.errors.push(`Overflow ${route} at ${width}: ${layout.scrollWidth}`);
      assert.equal(layout.h1, 1);
      if (width === 320) for (const caption of await page.locator('.data-table caption:visible').all()) {
        assert.ok((await caption.boundingBox()).width >= 200, `Readable mobile caption: ${route}`);
      }
      if (width === 1440 || width === 320) {
        const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        results.accessibility.push({ route, width, violations: audit.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
      }
    }
    console.log(`Checked ${route} at six widths.`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').innerText(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
  await page.locator('.menu-toggle').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Tab');
  const outline = await page.locator(':focus').evaluate(e => getComputedStyle(e).outlineWidth);
  assert.equal(outline, '2px');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator(':focus').getAttribute('class'), 'menu-toggle');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'work');
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.equal(await page.locator('.hero-copy').evaluate(e => getComputedStyle(e).animationName), 'none');
  await page.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('details').evaluate(e => e.open), true);
  results.interactions.push('Skip link, mobile menu keyboard/open/Escape/return focus/select, visible focus, reduced motion, experience disclosure');

  // Follow the new card and the existing circular project navigation.
  await page.locator('#project-payment-reliability .project-actions a').click();
  assert.ok(page.url().endsWith('/work/payment-reliability/'));
  assert.equal(await page.title(), 'Payments stuck on “Processing” | Suchithra R');
  assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /fintech product case study/);
  for (const width of [1440, 768, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const disclosure of await page.locator('.payment-disclosure').all()) {
      if (!await disclosure.evaluate(e => e.open)) await disclosure.locator('summary').click();
      assert.ok(await disclosure.locator('.data-table').isVisible());
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Expanded payment detail fits at ${width}`);
    for (const caption of await page.locator('.data-table caption').all()) {
      assert.ok((await caption.boundingBox()).width >= 200, `Expanded caption readable at ${width}`);
    }
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    results.accessibility.push({ route: '/work/payment-reliability/#expanded', width, violations: audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
  }
  await page.locator('.next-project h2 a').click();
  assert.ok(page.url().endsWith('/work/driver-cancellations/'));
  await page.goto(base + '/work/myntra-shopping-assistant/');
  await page.locator('.next-project h2 a').click();
  assert.ok(page.url().endsWith('/work/payment-reliability/'));
  await page.locator('.case-back').click();
  assert.equal(new URL(page.url()).hash, '#work');
  results.interactions.push('Fifth card, payment metadata, expandable tables at three widths, Myntra → Payments → Driver navigation, back to Product Work');

  await page.goto(base + '/prototype/');
  async function auditState(name) {
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    results.accessibility.push({ route: `/prototype/#${name}`, width: 390, violations: audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
  }
  for (const state of ['cancelled', 'rematching', 'recovered', 'matched']) {
    await page.locator(`[data-rider-next="${state}"]`).click();
    assert.equal(await page.locator(':focus').evaluate(e => e.tagName), 'H3');
    await auditState(`rider-${state}`);
  }
  await page.locator('#tab-rider').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#tab-driver').getAttribute('aria-selected'), 'true');
  await auditState('driver-incoming');
  for (const reason of ['fare', 'direction', 'traffic', 'other']) {
    for (const outcome of ['kept', 'cancelled']) {
      await page.locator('[data-driver-action="reason"]').click();
      await page.locator(`[data-reason="${reason}"]`).click();
      if (outcome === 'kept') await auditState(`driver-${reason}`);
      await page.locator(`[data-driver-action="${outcome}"]`).click();
      assert.ok((await page.locator('#driver-content h3').innerText()).includes(outcome === 'kept' ? 'stays' : 'cancelled'));
      await page.locator('[data-driver-action="incoming"]').click();
    }
  }
  await page.locator('#tab-driver').focus();
  await page.keyboard.press('End');
  assert.equal(await page.locator('#tab-ops').getAttribute('aria-selected'), 'true');
  const opsAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  results.accessibility.push({ route: '/prototype/#ops', width: 390, violations: opsAudit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
  results.interactions.push('Prototype: four rider transitions, four driver reasons × both outcomes, replay, keyboard tabs, ops panel');

  for (const route of routes.filter(route => route !== '/prototype/')) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) results.errors.push(`200% text overflow on ${route}`);
  }
  results.interactions.push('200% text reflow at 390px on homepage and all readers');
  // Core content and navigation remain available without scripting.
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  await noJS.goto(base);
  assert.ok(await noJS.locator('.primary-nav').isVisible());
  assert.equal(await noJS.locator('.project').count(), projects.length);
  await noJS.close();
  results.interactions.push('No-JavaScript homepage content and navigation');
  await writeFile('.qa/browser-results.json', JSON.stringify(results, null, 2));
  const violations = results.accessibility.flatMap(a => a.violations);
  console.log(JSON.stringify({ layouts: results.layouts.length, accessibilityAudits: results.accessibility.length, violations: violations.length, errors: results.errors, interactions: results.interactions }, null, 2));
  if (violations.length || results.errors.length) process.exitCode = 1;
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
