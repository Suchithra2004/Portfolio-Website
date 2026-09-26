import { document, projects, projectUrl, reportUrl, arrow, escape } from './components.mjs';
import { caseStudies } from './case-studies.mjs';

export function readerPage(project, index) {
  const study = caseStudies[project.slug];
  const next = projects[(index + 1) % projects.length];
  return document({
    title: `${project.title} — Suchithra R`,
    description: project.description,
    content: `<main id="main" tabindex="-1">
      <div class="case-hero container"><a class="text-link case-back" href="/#work"><span aria-hidden="true">←</span> Back to Product Work</a>
        <div class="case-heading"><div><p class="eyebrow">Case study ${project.number} / ${study.discipline}</p><h1>${project.title}</h1><p class="case-description">${project.description}</p></div><aside class="case-meta"><p><span class="small-label">Project status</span>${project.status}.</p><p><span class="small-label">Contribution</span>${project.contribution}</p><p>Suchithra R · Independent case study</p></aside></div>
        <div class="case-actions"><a class="text-link" href="${reportUrl(project)}">Read full report <span class="file-label">PDF · ${project.pages} pages</span> ${arrow(true)}</a>${project.slug === 'driver-cancellations' ? `<a class="button" href="/prototype/">Explore Prototype ${arrow(true)}</a>` : ''}</div>
        <div class="case-decision"><span class="small-label">The key decision</span><p>${project.decision}</p></div>
      </div>
      <div class="reader-layout container"><aside class="reader-toc" aria-label="Case study contents"><p class="eyebrow">In this case study</p><nav aria-label="On this page">${study.sections.map(section => `<a href="#${section.id}">${({ problem: 'The problem', contribution: 'My contribution', diagnosis: 'Diagnosis', options: 'Options & trade-offs', method: 'Audit method', findings: 'Reported findings', product: 'Product opportunity', prototype: 'Prototype', scope: 'Scope & trade-offs', flows: 'Product flows', prioritization: 'Prioritization', measurement: 'Metrics & experiments', limitations: 'Limitations', next: 'What to test next' })[section.id]}</a>`).join('')}</nav></aside>
        <article class="reader-body"><p class="reader-note reader-boundary">${study.boundary}</p>${study.sections.map(section => `<section class="reader-section" id="${section.id}" tabindex="-1"><h2>${section.title}</h2>${section.content}</section>`).join('')}<p class="reader-source">Adapted from the supplied ${project.pages}-page <a href="${reportUrl(project)}">${escape(project.title)} report (PDF)</a>. The full report contains the detailed source tables and assumptions.</p></article>
      </div>
      <div class="next-project container"><div><p class="eyebrow">Continue exploring / ${next.number}</p><h2><a href="${projectUrl(next)}">${next.title} ${arrow()}</a></h2></div><a class="text-link" href="/#work">All product work ${arrow()}</a></div>
    </main>`,
  });
}
