import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const destination = resolve('src/assets/fonts');
await mkdir(destination, { recursive: true });
const fonts = [
  { name: 'inter', query: 'Inter:wght@400..600' },
  { name: 'newsreader', query: 'Newsreader:opsz,wght@6..72,400..500' },
];

for (const font of fonts) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${font.query}&display=swap`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' },
  });
  if (!response.ok) throw new Error(`Font CSS failed: ${response.status}`);
  const css = await response.text();
  const latin = css.split('/* latin */').at(-1);
  const url = latin.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`Latin font file missing: ${font.name}`);
  const binary = await fetch(url);
  if (!binary.ok) throw new Error(`Font download failed: ${font.name}`);
  const bytes = Buffer.from(await binary.arrayBuffer());
  if (bytes.subarray(0, 4).toString() !== 'wOF2') throw new Error(`Expected real WOFF2 font: ${font.name}`);
  await writeFile(resolve(destination, `${font.name}-latin.woff2`), bytes);
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${font.name}/OFL.txt`);
  if (!license.ok) throw new Error(`License download failed: ${font.name}`);
  await writeFile(resolve(destination, `${font.name}-OFL.txt`), await license.text());
  console.log(`Downloaded ${font.name} Latin variable font and license.`);
}
