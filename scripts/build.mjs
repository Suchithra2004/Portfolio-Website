import { mkdir, cp, copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/home.mjs';
import { readerPage } from '../src/reader.mjs';
import { projects, document } from '../src/components.mjs';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const output = resolve(root, 'dist');

export async function build() {
  await mkdir(output, { recursive: true });
  await cp(resolve(root, 'src/assets'), resolve(output, 'assets'), { recursive: true });
  const reportDirectory = resolve(output, 'assets/reports');
  await mkdir(reportDirectory, { recursive: true });
  const reports = [
    ['Suchithra_R_Resume_Sales_CS.pdf', 'suchithra-r-resume.pdf'],
    ['ai_visibility_audit_apm_case_study_suchithra_r.pdf', 'ai-visibility-audit.pdf'],
    ['output/pdf/Reducing_Repeat_Driver_Cancellations_Case_Study.pdf', 'driver-cancellations.pdf'],
    ['Suchithra_R_Demo-to-Payment_Dropoff_Case_Study (1).pdf', 'demo-to-payment.pdf'],
    ['Suchithra_R_Myntra_AI_Shopping_Assistant_Report (1).pdf', 'myntra-shopping-assistant.pdf'],
  ];
  for (const [source, name] of reports) await copyFile(resolve(root, source), resolve(reportDirectory, name));
  await writeFile(resolve(output, 'index.html'), homePage());
  for (const [index, project] of projects.entries()) {
    const directory = resolve(output, 'work', project.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), readerPage(project, index));
  }
  await cp(resolve(root, 'prototype'), resolve(output, 'prototype'), { recursive: true });
  const original = await readFile(resolve(root, 'prototype/index.html'), 'utf8');
  const integrated = original
    .replace('../output/pdf/Reducing_Repeat_Driver_Cancellations_Case_Study.pdf', '../assets/reports/driver-cancellations.pdf')
    .replace('<div class="site-shell">', '<div class="site-shell"><a class="prototype-return" href="../work/driver-cancellations/">← Back to case study</a>')
    .replace('</head>', '<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg"><link rel="stylesheet" href="../assets/prototype-integration.css"></head>');
  await writeFile(resolve(output, 'prototype/index.html'), integrated);
  await writeFile(resolve(output, '404.html'), document({
    title: 'Page not found — Suchithra R',
    description: 'Return to Suchithra R’s Product / APM portfolio.',
    content: '<main class="container not-found" id="main"><p class="eyebrow">404 / Page not found</p><h1>Let’s get you back to the work.</h1><p>This page could not be found. The four case studies are on the homepage.</p><a class="button" href="/#work">View Product Work →</a></main>',
  }));
  console.log(`Built homepage, ${projects.length} case-study readers, prototype, and ${reports.length} PDFs → dist/`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
