import { document, projects, figures, projectUrl, actions, arrow } from './components.mjs';

function projectCard(project, variant) {
  return `<article class="project project-${variant}" id="project-${project.slug}" aria-labelledby="title-${project.slug}">
    <div class="project-intro"><p class="eyebrow">${project.number} <span class="eyebrow-divider">/</span> ${project.category}</p><h3 id="title-${project.slug}"><a href="${projectUrl(project)}">${project.title}</a></h3><p class="project-description">${project.description}</p><p class="project-status">${project.status}.</p></div>
    ${figures[project.slug]()}
    <div class="project-outro"><p class="contribution"><span class="small-label">My contribution</span>${project.contribution}</p><p class="project-skills">${project.skills.join(' · ')}</p>${actions(project)}</div>
  </article>`;
}

export function homePage() {
  return document({
    home: true,
    title: 'Suchithra R — Product / APM Portfolio',
    description: 'Customer-facing professional moving into Product. Explore Suchithra R’s case studies in marketplace recovery, AI visibility, shopping, and conversion.',
    content: `<main id="main" tabindex="-1">
      <section class="hero container" aria-labelledby="hero-title">
        <div class="hero-copy"><p class="eyebrow">Suchithra R · Product / APM portfolio</p><h1 id="hero-title">Product thinking, grounded in <em>customer conversations.</em></h1><p class="hero-support">I’m Suchithra, a customer-facing professional at Airtribe moving into Product. My case studies explore problem framing, prioritization, metrics, and experiment design across customer and business problems.</p><div class="hero-actions"><a class="button" href="#work">View Product Work ${arrow()}</a><a class="text-link" href="#experience">My Experience</a></div></div>
        <figure class="hero-persona"><div class="portrait-frame"><div class="portrait-mask"><img src="/assets/images/suchithra-r.jpg" width="400" height="400" alt="Suchithra R" fetchpriority="high" decoding="async"></div><svg class="portrait-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 2v36M2 20h36M7 7l26 26M7 33L33 7" stroke="currentColor" stroke-width="1.25"/></svg></div><figcaption>Customer perspective.<br>Product thinking.</figcaption></figure>
      </section>

      <section class="work-section container" id="work" tabindex="-1" aria-labelledby="work-title">
        <div class="section-heading"><div><p class="eyebrow">Selected work / 01—04</p><h2 id="work-title">Selected product work</h2></div><p>Four case studies on understanding a problem, choosing where to act, and defining what to learn next.</p></div>
        ${projectCard(projects[0], 'primary')}
        ${projectCard(projects[1], 'secondary')}
        <div class="supporting-projects">${projectCard(projects[2], 'supporting')}${projectCard(projects[3], 'supporting')}</div>
      </section>

      <section class="about-section section-space container" id="about" tabindex="-1" aria-labelledby="about-title">
        <div class="section-aside"><p class="eyebrow">The connection</p><h2 id="about-title">What I bring<br>to Product</h2><p class="margin-note">Customer context<br><span aria-hidden="true">↓</span><br>Product questions</p></div>
        <div class="about-copy"><p class="large-copy">At Airtribe, I work with customers from discovery through purchase, learning how needs, doubts, and perceived value shape decisions.</p><p>I’m bringing that perspective into Product through independent case studies: framing problems, comparing options, defining metrics, and planning experiments. The work here shows how I would approach those decisions, while my professional experience provides the customer and commercial context behind them.</p><a class="text-link" href="/work/demo-to-payment/">Explore the Demo → Payment case ${arrow()}</a><p class="caption">Independent illustrative case study</p></div>
      </section>

      <section class="thinking-section section-space container" aria-labelledby="thinking-title"><div class="section-heading"><div><p class="eyebrow">Reasoning, made visible</p><h2 id="thinking-title">How I think through<br>product problems</h2></div></div>
        <div class="thinking-row"><span class="row-number" aria-hidden="true">01</span><h3>Understand the decision</h3><div><p>Start with the needs, uncertainty, and trade-offs behind a customer’s choice.</p><div class="evidence-links"><a href="#experience">Airtribe experience ${arrow()}</a><a href="/work/demo-to-payment/#diagnosis">Objection taxonomy ${arrow()}</a></div></div></div>
        <div class="thinking-row"><span class="row-number" aria-hidden="true">02</span><h3>Choose where to act</h3><div><p>Compare options by reach, effort, risk, and what the evidence can support.</p><div class="evidence-links"><a href="/work/driver-cancellations/#prioritization">Cancellation RICE ${arrow()}</a><a href="/work/myntra-shopping-assistant/#prioritization">Myntra phasing ${arrow()}</a></div></div></div>
        <div class="thinking-row"><span class="row-number" aria-hidden="true">03</span><h3>Define what to learn</h3><div><p>Make a concept inspectable, then define success metrics, guardrails, and a test.</p><div class="evidence-links"><a href="/prototype/">Recovery prototype ${arrow(true)}</a><a href="/work/ai-visibility-audit/#next">Repeat-audit proposal ${arrow()}</a></div></div></div>
      </section>

      <section class="experience-section section-space container" id="experience" tabindex="-1" aria-labelledby="experience-title"><div class="section-heading"><div><p class="eyebrow">Professional experience</p><h2 id="experience-title">Customer and<br>commercial experience</h2></div><a class="text-link" href="/assets/reports/suchithra-r-resume.pdf">View Resume <span class="file-label">PDF</span> ${arrow(true)}</a></div>
        <article class="experience-entry"><div class="experience-meta"><h3>Airtribe</h3><p>October 2025–Present<br>Bangalore, India</p><span class="margin-note">Needs analysis · Value communication · Purchase decisions · Follow-through</span></div><div><h4>Business Development Intern <span aria-hidden="true">→</span><span class="sr-only">to</span> Executive</h4><ul class="experience-list"><li>Managed inbound customers from qualification and discovery through objection handling and closure across PML, BEL, and Gen AI verticals.</li><li>Closed <strong>₹46.7L+ in sales independently</strong> after moving into the full-time role; promoted from intern to executive within five months.</li><li>Built relationships that led to repeat business and referrals; identified enterprise leads requiring custom solutions and routed them to the B2B sales team.</li><li>Trained and mentored two interns on sales processes and CRM workflows.</li></ul><details class="experience-details"><summary>More experience detail</summary><p>Contributed ₹21L during the presales phase, including a month at 188% of target. Ranked in the Top 10 on the sales leaderboard multiple times and closed higher-ticket deals while keeping discount use low.</p></details></div></article>
        <article class="experience-entry compact"><div class="experience-meta"><h3>Wheels India</h3><p>June–July 2023<br>Chennai, India</p></div><div><h4>Intern</h4><p>Collaborated across functions on R&amp;D prototype validation, building attention to detail and structured problem-solving.</p></div></article>
      </section>

      <section class="education-section container" aria-labelledby="education-title"><div><p class="eyebrow">Education & learning</p><h2 id="education-title">An engineering foundation.</h2><h3>B.Tech, Electronics and Communication Engineering</h3><p>Amrita Vishwa Vidyapeetham · Chennai · 2021–2025</p></div><div class="education-learning"><span class="small-label">Relevant learning</span><p>Data Structures and Algorithms using Python</p><span class="small-label">Additional certifications</span><p>PCB Design · PLC Programming · ADAS</p></div></section>

      <section class="contact-section container" id="contact" tabindex="-1" aria-labelledby="contact-title"><div><p class="eyebrow">Start a conversation</p><h2 id="contact-title">Let’s talk about your<br>next product problem.</h2><p>I’m exploring APM and Product opportunities where customer understanding, commercial judgment, and structured problem-solving matter.</p><div class="contact-actions"><a class="button" href="mailto:suchi2004rajesh@yahoo.com">Email Suchithra ${arrow()}</a><a class="text-link" href="/assets/reports/suchithra-r-resume.pdf">View Resume <span class="file-label">PDF</span> ${arrow(true)}</a></div></div><div class="contact-address"><a href="mailto:suchi2004rajesh@yahoo.com">suchi2004rajesh@yahoo.com</a><p>Bangalore, India</p></div></section>
    </main>`,
  });
}
