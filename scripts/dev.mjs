import { watch } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { serve } from './serve.mjs';

function rebuild() {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
  return result.status === 0;
}

if (!rebuild()) process.exit(1);
serve(Number(process.env.PORT || 4173));
let pending;
for (const directory of ['src', 'prototype']) {
  watch(directory, { recursive: true }, () => {
    clearTimeout(pending);
    pending = setTimeout(() => { if (rebuild()) console.log('Updated. Refresh the browser to see changes.'); }, 120);
  });
}
