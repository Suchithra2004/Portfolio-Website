import { paymentFigure } from './payment-figures.mjs';

export const projects = [
  {
    slug: 'driver-cancellations', number: '01', category: 'Marketplace · Recovery & trust',
    title: 'Reducing Repeat Driver Cancellations',
    description: 'How could a ride marketplace recover rider trust when drivers cancel after a match?',
    contribution: 'Framed cancellation causes, prioritized three interventions, and defined recovery flows, metrics, and experiments.',
    status: 'Independent product concept · concept prototype available',
    skills: ['Problem framing', 'Marketplace metrics', 'RICE prioritization', 'Experiment design', 'Prototyping'],
    decision: 'Prioritize the next match after a cancellation.',
    pdf: 'driver-cancellations.pdf', pages: 5,
  },
  {
    slug: 'ai-visibility-audit', number: '02', category: 'AI search · Discovery & measurement',
    title: 'AI Visibility Audit',
    description: 'Where does a brand appear—or disappear—when buyers ask AI assistants for recommendations?',
    contribution: 'Synthesized reported query-level outcomes into visibility gaps, prioritized recommendations, and a plan for repeatable measurement.',
    status: 'Independent audit case study · reported qualitative snapshot',
    skills: ['Problem framing', 'Evidence synthesis', 'Measurement design', 'Prioritization'],
    decision: 'Separate category discovery from branded recall.',
    pdf: 'ai-visibility-audit.pdf', pages: 14,
  },
  {
    slug: 'demo-to-payment', number: '03', category: 'Edtech · Decision-making & conversion',
    title: 'Demo → Payment Drop-off',
    description: 'Why might interested learners hesitate after a demo, and what could make the next decision clearer?',
    contribution: 'Mapped objections to funnel stages, prioritized cost clarity and relevant proof, and planned experiments with learner-quality guardrails.',
    status: 'Independent illustrative case study',
    skills: ['Funnel diagnosis', 'Objection taxonomy', 'Prioritization', 'Experiment design', 'Guardrail metrics'],
    decision: 'Make total cost clear at the moment price is discussed.',
    pdf: 'demo-to-payment.pdf', pages: 11,
  },
  {
    slug: 'myntra-shopping-assistant', number: '04', category: 'E-commerce · Shopping & personalization',
    title: 'Myntra Personal Shopping Assistant',
    description: 'How could a wishlist help shoppers decide what to buy and when?',
    contribution: 'Scoped price alerts, wishlist organization, and recommendation flows, then sequenced delivery with metrics and test plans.',
    status: 'Independent product concept · not affiliated with Myntra',
    skills: ['Journey mapping', 'Product scoping', 'Prioritization', 'UX flows', 'Experiment design'],
    decision: 'Start with alerts and organization before expanding personalization.',
    pdf: 'myntra-shopping-assistant.pdf', pages: 11,
  },
  {
    slug: 'payment-reliability', number: '05', category: 'Fintech · Payments & Reliability',
    title: 'Payments stuck on “Processing”',
    description: 'How could a credit-first UPI app reduce confusion, duplicate payments, and support pressure when payments get stuck?',
    summary: 'A product case study on clearer pending payments, automated recovery, and reliability signals across a UPI stack the app does not fully control.',
    subtitle: 'Restoring trust in a credit-first UPI app by fixing what users see, do and get back when a payment hangs.',
    seoDescription: 'A fintech product case study on reducing confusion, duplicate payments, and support pressure when UPI payments get stuck on Processing.',
    contribution: 'Framed the pending-payment problem, mapped failure points and user reactions, defined reliability metrics, proposed recovery and trust interventions, prioritized with RICE, and designed experiments.',
    status: 'Independent product case study · illustrative assumptions',
    date: 'September 2026',
    skills: ['Problem framing', 'Fintech / UPI', 'Reliability', 'Metrics', 'RICE prioritization', 'Experiment design', 'UX flows'],
    decision: 'The goal is not “never pending.” It is “never confusing.”',
    pdf: 'payment-reliability.pdf', pages: 13,
  },
];

export const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

export const arrow = (diagonal = false) => `<span class="link-arrow" aria-hidden="true">${diagonal ? '↗' : '→'}</span>`;
export const projectUrl = project => `/work/${project.slug}/`;
export const reportUrl = project => `/assets/reports/${project.pdf}`;

export function header(home = false) {
  return `<a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="container header-inner">
        <a class="wordmark" href="/" aria-label="Suchithra R — Home">Suchithra R<span aria-hidden="true">.</span></a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav" hidden>Menu <span aria-hidden="true">+</span></button>
        <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
          <a class="nav-work" href="${home ? '' : '/'}#work">Product Work</a>
          <a href="${home ? '' : '/'}#about">About</a>
          <a href="${home ? '' : '/'}#experience">Experience</a>
          <a href="${home ? '' : '/'}#contact">Contact</a>
        </nav>
      </div>
    </header>`;
}

export function footer() {
  return `<footer class="site-footer container"><a class="wordmark" href="/">Suchithra R<span aria-hidden="true">.</span></a><p>Customer perspective. Product thinking.</p><a class="text-link" href="/#work">Back to product work ${arrow()}</a></footer>`;
}

export function document({ title, description, content, home = false }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#F7F4EE">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="preload" href="/assets/fonts/newsreader-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/styles.css">
  <script src="/assets/site.js" defer></script>
</head>
<body>${header(home)}${content}${footer()}</body>
</html>`;
}

export function actions(project) {
  return `<div class="project-actions"><a class="text-link" href="${projectUrl(project)}" aria-label="View case study: ${escape(project.title)}">View Case Study ${arrow()}</a>${project.slug === 'driver-cancellations' ? `<a class="text-link secondary-link" href="/prototype/">Explore Prototype ${arrow(true)}</a>` : ''}</div>`;
}

export function recoveryFigure() {
  return `<figure class="project-figure recovery-figure">
    <div class="figure-heading"><span class="eyebrow">A better next match</span><span class="figure-index" aria-hidden="true">01 / RECOVERY</span></div>
    <ol class="recovery-steps" aria-label="Proposed rider recovery flow"><li><span class="step-node">1</span><span>Matched</span></li><li><span class="step-node">2</span><span>Driver cancelled</span></li><li class="active-step"><span class="step-node">3</span><span>Priority rematch</span></li></ol>
    <div class="recovery-detail"><div class="recovery-note"><span class="small-label">The product decision</span><p>Keep the request.<br>Recover the rider.</p><span class="note-rule"></span><small>Cancellation reason<br>↓<br>Relevant driver context</small></div><img src="/assets/images/priority-rematch.webp" width="690" height="818" alt="Actual concept prototype: Finding you a new driver. Priority matching is active, with an illustrative 3–6 minute estimate." loading="lazy" decoding="async"></div>
    <figcaption>Product concept · illustrative trip details<br><span>Track requests with 2+ driver cancellations.</span></figcaption>
  </figure>`;
}

export function auditFigure() {
  return `<figure class="project-figure audit-figure">
    <div class="figure-heading"><span class="eyebrow">A mention is only the start</span><span class="figure-index" aria-hidden="true">02 / AUDIT</span></div>
    <div class="audit-matrix" role="table" aria-label="Excerpt of historical reported AI visibility outcomes">
      <div class="matrix-head" role="row"><span role="columnheader">Query intent</span><span role="columnheader">ChatGPT</span><span role="columnheader">Gemini</span><span role="columnheader">Perplexity</span></div>
      <div class="matrix-row" role="row"><strong role="rowheader">Generic discovery</strong><span role="cell"><span class="mobile-engine" aria-hidden="true">ChatGPT</span><i aria-hidden="true">—</i> Absent</span><span role="cell"><span class="mobile-engine" aria-hidden="true">Gemini</span><i aria-hidden="true">—</i> Absent</span><span role="cell"><span class="mobile-engine" aria-hidden="true">Perplexity</span><i aria-hidden="true">—</i> Absent</span></div>
      <div class="matrix-row" role="row"><strong role="rowheader">Subscription consideration</strong><span class="present" role="cell"><span class="mobile-engine" aria-hidden="true">ChatGPT</span><i aria-hidden="true">1</i> First</span><span class="present" role="cell"><span class="mobile-engine" aria-hidden="true">Gemini</span><i aria-hidden="true">2</i> Second</span><span role="cell"><span class="mobile-engine" aria-hidden="true">Perplexity</span><i aria-hidden="true">—</i> Absent</span></div>
    </div>
    <div class="figure-insight"><span aria-hidden="true">↳</span><p>Category discovery and branded recall answer different questions.</p></div>
    <figcaption>Excerpt from the report’s qualitative snapshot · 5 queries across 3 assistants</figcaption>
  </figure>`;
}

export function funnelFigure() {
  return `<figure class="project-figure funnel-figure">
    <div class="figure-heading"><span class="small-label">Illustrative baseline from the case study</span></div>
    <ol class="funnel-stages" aria-label="Per 100 demo attendees: 45 have fees shared, 18 show intent, and 8 pay."><li><span>Fee shared</span><strong>45</strong><i class="funnel-bar first-bar" aria-hidden="true"></i></li><li><span>Intent</span><strong>18</strong><i class="funnel-bar second-bar" aria-hidden="true"></i></li><li><span>Paid</span><strong>8</strong><i class="funnel-bar third-bar" aria-hidden="true"></i></li></ol>
    <div class="funnel-callout"><span aria-hidden="true">↳</span> Total-cost clarity + relevant proof</div>
    <figcaption>Per 100 demo attendees · an illustrative edtech scenario</figcaption>
  </figure>`;
}

export function shoppingFigure() {
  return `<figure class="project-figure shopping-figure">
    <div class="figure-heading"><span class="small-label">A wishlist with a next step</span></div>
    <ol class="shopping-steps"><li><span class="shopping-icon" aria-hidden="true">♡</span><strong>Save an item</strong><span>Keep what catches your eye.</span></li><li class="shopping-choice"><span class="shopping-icon" aria-hidden="true">↘</span><strong>Choose an alert</strong><span class="alert-option"><i aria-hidden="true"></i> Set my price</span><span class="alert-option"><i aria-hidden="true"></i> Choose a channel</span></li><li><span class="shopping-icon" aria-hidden="true">↩</span><strong>Return when the price changes</strong><span>Your size. Your choice.</span></li></ol>
    <figcaption>Proposed flow · alerts first, personalization next</figcaption>
  </figure>`;
}

export const figures = { 'driver-cancellations': recoveryFigure, 'ai-visibility-audit': auditFigure, 'demo-to-payment': funnelFigure, 'myntra-shopping-assistant': shoppingFigure, 'payment-reliability': paymentFigure };

export function dataTable(caption, headings, rows) {
  return `<table class="data-table" role="table"><caption>${caption}</caption><thead role="rowgroup"><tr role="row">${headings.map(heading => `<th scope="col" role="columnheader">${heading}</th>`).join('')}</tr></thead><tbody role="rowgroup">${rows.map(row => `<tr role="row">${row.map((cell, index) => index === 0 ? `<th scope="row" role="rowheader">${cell}</th>` : `<td role="cell"><span class="cell-label" aria-hidden="true">${headings[index]}</span>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

export function note(label, content) {
  return `<aside class="reader-note"><span class="small-label">${label}</span><p>${content}</p></aside>`;
}
