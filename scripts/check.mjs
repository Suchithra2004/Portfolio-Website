import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { projects } from '../src/components.mjs';

const root = resolve('dist');
const htmlFiles = [];
async function walk(directory) {
  for (const file of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, file.name);
    if (file.isDirectory()) await walk(path);
    else if (file.name.endsWith('.html')) htmlFiles.push(path);
  }
}
await walk(root);
assert.equal(projects.length, 4);
for (const font of ['inter', 'newsreader']) {
  const bytes = await readFile(resolve(root, `assets/fonts/${font}-latin.woff2`));
  assert.equal(bytes.subarray(0, 4).toString(), 'wOF2', `Real WOFF2: ${font}`);
}
let links = 0;
for (const path of htmlFiles) {
  const html = await readFile(path, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One H1: ${path}`);
  const base = new URL(relative(root, path).split(sep).join('/'), 'https://portfolio.test/');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1], base);
    if (url.origin !== base.origin) continue;
    let target = resolve(root, '.' + decodeURIComponent(url.pathname));
    assert.ok(target.startsWith(root), 'Asset must stay in build');
    const info = await stat(target).catch(() => null);
    assert.ok(info, `Missing ${match[1]} in ${path}`);
    if (info.isDirectory()) target = resolve(target, 'index.html');
    const data = await readFile(target);
    if (url.hash) assert.ok(data.toString().includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${match[1]} in ${path}`);
    if (target.endsWith('.pdf')) assert.equal(data.subarray(0, 5).toString(), '%PDF-');
    links++;
  }
}
console.log(`PASS: ${htmlFiles.length} HTML pages, ${links} local links/assets/anchors, PDF signatures, one H1 per page.`);
