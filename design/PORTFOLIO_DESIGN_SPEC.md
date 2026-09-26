# Suchithra R — Product / APM Portfolio Design Specification

**Stage:** Design and content direction · **Prepared:** 27 September 2026

This specification defines the portfolio experience for a later implementation. Proposed interface details, measurements, and layouts are design recommendations. Statements about Suchithra and her work are grounded in the supplied resume, four case studies, and existing cancellation prototype. Source references are collected at the end.

## 1. Executive design concept

**A portfolio of product decisions, grounded in customer conversations.**

Build a warm, editorial portfolio that gives the work the most space. The reader should see a clear transition into Product, a concrete product decision, and an inviting route into the strongest case study within the first screen.

The visual identity comes from thoughtful typography, precise diagrams, and short annotations that explain a choice. The recurring visual idea is simple: a customer problem leads to a product choice and a way to evaluate it.

The recommended homepage leads with **Reducing Repeat Driver Cancellations**, followed by **AI Visibility Audit**. These show product breadth and make the work tangible. **Demo → Payment Drop-off** and **Myntra Personal Shopping Assistant** provide supporting depth. Airtribe then explains where her customer and commercial understanding comes from.

**Primary visitor action:** open a case study. **Secondary action:** explore the cancellation prototype. **Hiring action:** read her experience and contact her.

## 2. Portfolio positioning

### The positioning to communicate

> Suchithra R is a customer-facing professional moving into Product, with commercial experience at Airtribe and independent case studies in marketplace recovery, AI search, shopping, and conversion.

### The evidence behind it

| Positioning claim | Supporting evidence | Appropriate wording |
|---|---|---|
| Understands customer decisions | Consultative discovery, needs analysis, objections, and full-cycle inbound sales at Airtribe | “Experience understanding customer needs and purchase decisions” |
| Has commercial judgment | Resume reports ₹46.7L+ independently closed after moving full time; high-ticket deals with limited discounting | “Commercial experience with high-consideration purchases” |
| Can structure a product problem | Cancellation taxonomy; AI visibility dimensions; learner objection taxonomy | “Case studies that turn broad problems into specific decisions” |
| Can prioritize and define measurement | RICE, metrics trees, experiment plans, and guardrails in the supplied cases | “Practice in prioritization, metrics, and experiment design” |
| Can make a concept tangible | Cancellation prototype; Myntra flows and wireframes | “Product concepts expressed through flows and prototypes” |

Keep employment and independent work visibly distinct. “Product / APM portfolio” describes the portfolio's purpose. “Product Manager at Airtribe” would contradict the resume.

Use “sales discovery” or “customer needs analysis” when describing the Airtribe work. Use “proposed interviews” for research that appears only in an experiment plan. The materials do not establish completed formal user interviews, shipped product ownership, or measured product impact.

## 3. Three visual directions

| Token / character | A — Clear editorial | B — Warm editorial | C — Quiet dark |
|---|---|---|---|
| Background | Cool paper `#F7F8FA` | Warm paper `#F7F4EE` | Deep charcoal `#161C1B` |
| Primary text | `#191C20` | `#242823` | `#F5F4EC` |
| Secondary text | `#586171` | `#59645C` | `#BBC5BC` |
| Accent | Cobalt `#294AC0` | Forest `#28584B` | Pale sage `#BBD9A4` |
| Decorative borders | `#D9DEE6` | `#D9DDD3` | `#35423C` |
| Card surface | `#FFFFFF` | `#FFFFFF` | `#202925` |
| Hover surface | `#EDF1FC` | `#EDF2EB` | `#29372F` |
| Accent hover | `#203A99` | `#1C4036` | `#D4E8C5` |
| Typography direction | Mostly sans, serif for short display passages | Editorial serif headlines, crisp sans body and diagrams | Restrained serif headings, sans body |
| Benefit | Direct, analytical, highly scannable | Human, readable, and suited to both customer stories and analytical work | Distinctive visual atmosphere and strong diagram contrast |
| Main risk | Can resemble a generic software portfolio | Can become too soft if text contrast or structure is weakened | Can make reading long reports harder and suggest a developer portfolio |

These are palette proposals. Direction B is developed below; A and C would need their own complete contrast and component-state review before use.

## 4. Recommended visual direction

**Choose B — Warm editorial.**

- **APM positioning:** precise diagrams and visible decisions communicate analytical practice; the warmer surface acknowledges the customer-facing background.
- **Recruiter readability:** dark text on a light background works well for short summaries, longer case studies, and PDF transitions.
- **Uniqueness:** the identity comes from the combination of serif headlines, narrow annotations, and project-specific diagrams. It does not depend on decorative effects.
- **Professionalism:** one restrained accent and consistent spacing support a mature presentation.
- **Case-study presentation:** neutral project surfaces can accommodate an audit matrix, a recovery flow, shopping wireframes, and a funnel without becoming four unrelated microsites.

Use no alternate theme in the first version. One carefully resolved direction is sufficient for this portfolio's reading task.

## 5. Color system

| Role | Value | Intended use |
|---|---|---|
| Page background | `#F7F4EE` | Main canvas |
| Surface | `#FFFFFF` | Project figures and selected content blocks |
| Surface hover | `#EDF2EB` | Gentle project-surface change |
| Primary text | `#242823` | Headlines and body text |
| Secondary text | `#59645C` | Supporting copy, captions, metadata |
| Accent | `#28584B` | Primary buttons, links, active navigation, focus rings |
| Accent hover | `#1C4036` | Hover and pressed emphasis |
| Decorative border | `#D9DDD3` | Separators that are not essential to understanding a control |
| Control boundary | `#7A877D` | Outline buttons and boundaries needed to identify controls |
| Subtle accent fill | `#EDF2EB` | Decision annotations and selected states |

Calculated contrast pairs for the recommended palette:

- Primary text on page: **13.64:1**.
- Secondary text on page: **5.62:1**.
- Accent text on page: **7.39:1**.
- White button text on accent: **8.12:1**.
- Control boundary on white: **3.76:1**; on page: **3.42:1**.

The decorative border is intentionally light and must not carry an essential control state alone. Use text labels and shapes as well as color in every project diagram. Avoid red/green-only distinctions in the audit matrix.

## 6. Typography system

**Display:** Newsreader, regular 400 and medium 500. **Body and interface:** Inter, regular 400, medium 500, and semibold 600.

Newsreader is intended for on-screen reading and is available under the SIL Open Font License. Inter supplies a legible interface companion. Use upright styles by default; a brief italic phrase can add emphasis, but it should not become the identity's main device. [Newsreader source](https://github.com/productiontype/Newsreader) · [Inter source](https://rsms.me/inter/)

| Style | Desktop | Tablet | Mobile | Weight / line height |
|---|---|---|---|---|
| Hero headline | 64 px | 52 px | 38–40 px | Newsreader 400 / 1.08–1.12 |
| Section heading | 40 px | 36 px | 30 px | Newsreader 500 / 1.15 |
| Featured project title | 34 px | 30 px | 28 px | Inter 600 / 1.18 |
| Supporting project title | 26 px | 25 px | 25 px | Inter 600 / 1.22 |
| Hero support | 18 px | 18 px | 17 px | Inter 400 / 1.6 |
| Body | 17 px | 17 px | 16 px | Inter 400 / 1.6 |
| Navigation / CTA | 15 px | 15 px | 16 px | Inter 500–600 / 1.4 |
| Captions / evidence labels | 13–14 px | 13–14 px | 13–14 px | Inter 400–500 / 1.5 |

Keep body measures around 55–68 characters. Use no fixed line breaks that create awkward mobile wrapping. Headlines may have modest negative tracking, approximately −1%; body text stays at normal tracking. Use tabular numerals inside matrices and funnels only.

Typography fallback: a system serif for Newsreader and the system sans for Inter. Font loading must preserve readable text and reserve enough space to avoid large layout shifts.

## 7. Design principles

1. **Show the decision.** Each project preview should make one meaningful product choice visible.
2. **Keep claims close to evidence.** A reported audit finding, a proposed experiment, and a sales achievement need different labels.
3. **Put work before biography.** Recruiters should encounter the strongest product artifact before a detailed career history.
4. **Make the transition explicit once.** State the move into Product in the hero; let the work and experience substantiate it.
5. **Use distinct project compositions.** Match the visual to the reasoning: a flow, matrix, funnel, or journey.
6. **Use hierarchy instead of effects.** Size, spacing, type, and placement do the work.
7. **Keep exploration optional.** Essential content is visible without hovering, opening accordions, or watching animation.

## 8. Information architecture

### Primary structure

- **Home:** one main portfolio page.
- **Product Work:** homepage anchor and four case-study reader pages.
- **About:** homepage anchor containing the transition narrative.
- **Experience:** homepage anchor, followed by education.
- **Contact:** homepage anchor.
- **Resume:** PDF utility link within Experience and Contact.
- **Cancellation prototype:** dedicated full-width experience linked from its card and case study.

The four case-study reader pages are the only additional narrative pages. Each presents the existing source in a more readable web format and offers its PDF. Their shared opening structure is: title → project status → problem → contribution → key decision → full reasoning. End with limitations, what would be tested next, and another project.

Use **“What this work produced”** for conceptual outputs. An “Impact” section would require measured results that these concept studies do not supply.

### Navigation labels

The name “Suchithra R” links to Home. Visible links are **Product Work · About · Experience · Contact**. This preserves the five destinations without a redundant Home label.

### Link behavior

Case-study links open in the same tab. The reader page provides **Read full report (PDF)** with format and page count. The cancellation card also offers **Explore prototype**; it opens the existing prototype as a full page, with a clear return path in the later portfolio integration. Preserve the visitor's previous scroll position on return.

Do not add a live AI-audit CTA: the supplied report documents a published audit experience but does not supply a verified destination URL.

## 9. Detailed homepage structure

| Order | Section | What it must accomplish | Approximate copy budget |
|---|---|---|---|
| 1 | Navigation | Orient and offer direct access | Labels only |
| 2 | Hero | Establish identity, Product transition, and next action | 55–75 words |
| 3 | Selected product work | Show four projects with clear hierarchy | 280–360 words |
| 4 | About | Explain why her background connects to Product | 65–85 words |
| 5 | How I think through product problems | Connect capabilities to evidence | 90–120 words |
| 6 | Experience | Provide accurate professional context | 130–170 words |
| 7 | Education and learning | Supply relevant background compactly | 40–70 words |
| 8 | Contact | Give a clear hiring next step | 35–50 words |

Target roughly 750–900 words for the complete homepage. The full reports carry the depth.

At 1440 × 900, use a 1200 px maximum content width and 120 px outer margins. At 1366 px, the same maximum produces approximately 83 px margins. Navigation is approximately 72 px tall; the hero content area should usually fit within 400–440 px. The first featured title and the beginning of its visual should be visible in a standard laptop's first viewport. Treat these as layout targets, never fixed heights that clip content.

## 10. Hero design and five headline options

### Headline options

1. **Product thinking, grounded in customer conversations.** — Recommended.
2. From understanding customers to shaping product decisions.
3. Turning customer needs into product opportunities.
4. Customer questions. Clearer product decisions.
5. Finding the product problem behind the customer question.

Option 1 names the desired discipline and the existing source of experience without implying a prior PM role.

### Recommended hero copy

**Eyebrow:** SUCHITHRA R · PRODUCT / APM PORTFOLIO

**Headline:** Product thinking, grounded in customer conversations.

**Supporting statement:** I’m Suchithra, a customer-facing professional at Airtribe moving into Product. My case studies explore problem framing, prioritization, metrics, and experiment design across customer and business problems.

**Primary CTA:** View Product Work →

**Secondary CTA:** My Experience

### Composition

Use an eight-column text area and a four-column margin area within the desktop grid. The right side contains a small decision excerpt, approximately 240 × 170 px, with a thin rule and generous internal space:

> FROM THE CANCELLATION CASE STUDY  
> After a driver cancels, prioritize the next match.  
> Proposal · Evaluate repeated cancellations and time to rematch.

This note links to the featured work. It is a real proposal from the case, not a decorative chart. It should remain visually quieter than the headline and CTA. Do not add a headshot without a supplied image, an invented personal quote, availability status, a sales counter, or a rotating role title.

## 11. About section design

**Section title:** What I bring to Product

**Recommended copy:**

> At Airtribe, I work with customers from discovery through purchase, learning how needs, doubts, and perceived value shape decisions. I’m bringing that perspective into Product through independent case studies: framing problems, comparing options, defining metrics, and planning experiments. The work here shows how I would approach those decisions, while my professional experience provides the customer and commercial context behind them.

Use a short editorial passage with one narrow side annotation: **Customer context → product questions**. Below it, one link returns to Demo → Payment as the closest thematic bridge. Label that destination **Independent illustrative case study** so it cannot be mistaken for an Airtribe project.

Keep this section to two short paragraphs or one 65–85-word passage. Avoid an unverified “why I fell in love with Product” origin story.

## 12. Product Work section design

**Section heading:** Selected product work

**Intro:** Four case studies on understanding a problem, choosing where to act, and defining what to learn next.

### Recommended hierarchy

1. **Reducing Repeat Driver Cancellations — primary feature.** Most complete connection between a problem, trade-offs, metrics, experiments, and an inspectable prototype.
2. **AI Visibility Audit — secondary feature.** Adds AI-search analysis and evidence interpretation. Present findings as reported qualitative observations, with the source limitations visible in the reader page.
3. **Demo → Payment Drop-off — supporting project, first.** The strongest connection to her commercial background. Supporting placement avoids making the portfolio read primarily as sales conversion work.
4. **Myntra Personal Shopping Assistant — supporting project, second.** Shows consumer-product flows, scope decisions, and phased delivery.

Use two full-width project compositions followed by two supporting cards in a row. They share type, spacing, and evidence labels, but their figures have different structures. Avoid numbered ratings, “best project” badges, and four equally sized generic tiles.

**Project labels:** “Independent product concept,” “Independent audit case study,” or “Independent illustrative case study,” as appropriate. Use these once per card near the title. Put data caveats directly beside the figure they qualify.

## 13. Detailed treatment of the four project cards

### A. Reducing Repeat Driver Cancellations

**Homepage copy**

- **Title:** Reducing Repeat Driver Cancellations
- **One-line description:** How could a ride marketplace recover rider trust when drivers cancel after a match?
- **Contribution:** Framed cancellation causes, prioritized three interventions, and defined recovery flows, metrics, and experiments.
- **Role/status:** Independent product concept · concept prototype available.
- **Skills:** Problem framing · Marketplace metrics · RICE prioritization · Experiment design · Prototyping.
- **CTAs:** View Case Study → · Explore Prototype ↗.
- **Decision annotation:** Prioritize the next match after a cancellation.

**Visual treatment:** A 55/45 visual-to-copy split within a full-width feature. The illustration uses a compact three-state sequence: **Matched → Driver cancelled → Priority rematch**. Use an actual crop from the existing prototype for the recovery state, placed beside a small “Cancellation reason → relevant driver context” annotation. This connects rider recovery to the driver intervention without showing three tiny phones.

The caption reads **Product concept · illustrative trip details**. Show no performance-lift figure on the homepage. An ETA range remains a labeled scenario example if visible in the crop. Keep the dedicated Spiral Exposure Rate visible as a label: **Requests with 2+ driver cancellations**.

The source report is five pages; the prototype provides Rider, Driver, and Ops views. An optional reader-page route offers “Read the strategy” and “Try the flow” immediately after the summary.

### B. AI Visibility Audit

**Homepage copy**

- **Title:** AI Visibility Audit
- **One-line description:** Where does a brand appear—or disappear—when buyers ask AI assistants for recommendations?
- **Contribution:** Synthesized reported query-level outcomes into visibility gaps, prioritized recommendations, and a plan for repeatable measurement.
- **Role/status:** Independent audit case study · reported qualitative snapshot.
- **Skills:** Problem framing · Evidence synthesis · Measurement design · Prioritization.
- **CTA:** View Case Study →.
- **Decision annotation:** Separate category discovery from branded recall.

**Visual treatment:** A compact editorial scorecard, not an imitation AI chat window. Show two named rows from the report's five-query comparison and the three assistant columns:

| Reported query intent | ChatGPT | Gemini | Perplexity |
|---|---|---|---|
| Generic discovery | Absent | Absent | Absent |
| Subscription consideration | First | Second | Absent |

Use words and small outlined symbols. The caption reads **Excerpt from the report’s qualitative snapshot · 5 queries across 3 assistants**. These are historical, site-reported findings, not a current benchmark. The feature's supporting annotation connects **Query → visibility gap → prioritized action**.

The 14-page reader must retain the missing raw logs, timestamps, repetitions, and scoring-rubric caveats. Do not create a 0–100 visibility score or imply a functioning SaaS audit tool.

### C. Demo → Payment Drop-off

**Homepage copy**

- **Title:** Demo → Payment Drop-off
- **One-line description:** Why might interested learners hesitate after a demo, and what could make the next decision clearer?
- **Contribution:** Mapped objections to funnel stages, prioritized cost clarity and relevant proof, and planned experiments with learner-quality guardrails.
- **Role/status:** Independent illustrative case study.
- **Skills:** Funnel diagnosis · Objection taxonomy · Prioritization · Experiment design · Guardrail metrics.
- **CTA:** View Case Study →.
- **Decision annotation:** Make total cost clear at the moment price is discussed.

**Visual treatment:** A short decision-stage funnel: **Fee shared → Intent → Paid**. Label its existing illustrative values **45 → 18 → 8, per 100 demo attendees**. Put **Illustrative baseline from the case study** immediately above it. Below the funnel, attach a single callout to the first transition: **Total-cost clarity + relevant proof**. The graphic describes the problem and intervention, with no “after” funnel.

This is a conceptual edtech scenario, not Airtribe analytics or a company initiative. The 11-page reader can carry the full six-stage funnel, RICE, and experiment plan. Avoid the source's forecast revenue figure in the homepage preview; it adds apparent impact without measured evidence.

### D. Myntra Personal Shopping Assistant

**Homepage copy**

- **Title:** Myntra Personal Shopping Assistant
- **One-line description:** How could a wishlist help shoppers decide what to buy and when?
- **Contribution:** Scoped price alerts, wishlist organization, and recommendation flows, then sequenced delivery with metrics and test plans.
- **Role/status:** Independent product concept · not affiliated with Myntra.
- **Skills:** Journey mapping · Product scoping · Prioritization · UX flows · Experiment design.
- **CTA:** View Case Study →.
- **Decision annotation:** Start with alerts and organization before expanding personalization.

**Visual treatment:** Compose three small panels from the report's flow: **Save an item → Choose an alert → Return when the price changes**. Use the source wireframe structure and neutral garment outlines, with the alert-choice panel largest. Add a thin secondary row, **Wishlist categories → relevant recommendations**, to show the later scope without implying a chatbot is the first release.

Use no stock fashion image or animated price ticker. If a source price remains in a crop, retain an illustrative label. The homepage should omit the +25%, +20%, +15%, and +10% targets; the 11-page reader may show them explicitly as proposed targets with guardrails.

### Shared card interaction

The project title and “View Case Study” form one clear reading destination. Do not make an entire card a nested link when it also contains a prototype CTA. On hover or keyboard focus, strengthen the border and underline the title. Keep skill labels as one quiet text line, not five separate pills. On touch, all actions remain visible.

## 14. Product Thinking / Skills section

**Title:** How I think through product problems

Use three evidence-led rows. Each has a verb, a short explanation, and a link to supporting work.

| Row | Recommended copy | Evidence link |
|---|---|---|
| Understand the decision | Start with the needs, uncertainty, and trade-offs behind a customer’s choice. | Airtribe discovery experience + Demo → Payment taxonomy |
| Choose where to act | Compare options by reach, effort, risk, and what the evidence can support. | Cancellation RICE + Myntra phasing |
| Define what to learn | Make a concept inspectable, then define success metrics, guardrails, and a test. | Cancellation prototype + AI repeat-audit proposal |

The grouping covers customer/business understanding, product judgment, and execution. Beneath it, a compact line can say **Working tools listed in my resume: CRM workflows, Excel, Python.** Do not add Figma, SQL, analytics platforms, or engineering proficiency based on the existence of an assisted prototype.

Use “customer discovery” with its context explained; do not imply a completed formal research program. No proficiency percentages, star ratings, or skill-logo wall.

## 15. Experience section

**Title:** Customer and commercial experience

### Airtribe — primary entry

**Business Development Intern → Executive**  
**October 2025–Present · Bangalore, India**

Recommended visible bullets:

- Managed inbound customers from qualification and discovery through objection handling and closure across PML, BEL, and Gen AI verticals.
- Closed **₹46.7L+ in sales independently** after moving into the full-time role; promoted from intern to executive within five months.
- Built relationships that led to repeat business and referrals; identified enterprise leads requiring custom solutions and routed them to the B2B sales team.
- Trained and mentored **two interns** on sales processes and CRM workflows.

A small side note explains the transferable exposure: **Needs analysis · Value communication · Purchase decisions · Follow-through**. This is interpretation of the documented activities, not a change to the job title.

Keep optional detail behind “More experience detail”: ₹21L contributed during presales, a month at 188% of target, repeated Top 10 leaderboard placements, and higher-ticket selling with limited discounting. Do not add presales revenue to full-time revenue as a new total; the source does not establish a combined reporting basis.

### Wheels India — compact entry

**Intern · June–July 2023 · Chennai, India**

> Collaborated across functions on R&D prototype validation, building attention to detail and structured problem-solving.

Use a simple two-entry timeline with thin rules and dates. Avoid company-logo trophies or a large revenue counter. The revenue achievement substantiates commercial experience and stays within this section.

**Resume CTA:** View Resume (PDF). Preserve the source resume's truthful employment titles. Its current sales-oriented heading should be expected when the PDF opens.

## 16. Education / Certifications

Present this as a small concluding block within the Experience area.

**B.Tech, Electronics and Communication Engineering**  
Amrita Vishwa Vidyapeetham · Chennai · 2021–2025

**Relevant learning:** Data Structures and Algorithms using Python.

**Additional certifications:** PCB Design · PLC Programming · ADAS.

Use two light columns on desktop and stacked text on mobile. No certificate thumbnail grid. The resume does not provide issuers, completion dates, grades, or credential URLs; leave those fields out.

## 17. Contact section

### Recommended headline

**Let’s talk about your next product problem.**

**Supporting copy:** I’m exploring APM and Product opportunities where customer understanding, commercial judgment, and structured problem-solving matter.

**Primary action:** Email Suchithra →  
**Visible email:** suchi2004rajesh@yahoo.com  
**Secondary action:** View Resume (PDF)  
**Location:** Bangalore, India

Alternative headlines:

- Looking for a customer-informed perspective on Product?
- Have a product problem worth exploring?

Use an email link with the full address visible and selectable. A secondary copy-email control may confirm **Email copied** after success; it must not claim success if copying fails. A contact form adds little here and creates another delivery path to maintain.

The resume supplies a phone number, but the homepage can keep contact focused on email and leave phone access in the resume. No LinkedIn or GitHub URL was supplied; add neither until a verified destination exists. Do not add an immediate-availability badge or response-time promise.

## 18. Navigation

**Desktop:** a 72 px header, name on the left, four section links on the right. The header becomes sticky with an opaque page-colored surface and a fine bottom rule. “Product Work” receives slightly stronger weight, not a filled button.

**Tablet:** retain the same text navigation while it fits without crowding. The main layout changes before navigation needs to collapse.

**Mobile:** a 64 px header with name and a labeled **Menu** control. The expanded panel is an in-flow list of the same four destinations. Keep its state clear, support Escape to close, return focus to the trigger on close, and close after a destination is chosen. Navigation content must remain usable by keyboard.

An active-section underline helps orientation but never replaces the text label. Anchor destinations must sit below the sticky header. Provide a visible-on-focus skip link to the main content. At the end of a case study, offer **Back to Product Work**.

## 19. Responsive behavior

| Element | Desktop, 1200 px and above | Tablet, 768–1199 px | Mobile, below 768 px |
|---|---|---|---|
| Grid | 12 columns; max 1200 px; 24 px gaps | 8 columns; 32 px outer space; 20 px gaps | Single reading column; 20 px outer space, 16 px at very narrow widths |
| Hero | Text 8 columns, decision excerpt 4 | Text takes most width; excerpt becomes a short lower row | Headline, support, actions, then a compact decision excerpt |
| Hero actions | Side by side | Side by side if labels fit | Primary full width; secondary text link below |
| Featured work | Two-column composition | Stack at widths where copy would become cramped, approximately below 960 px | Title and problem first, simplified figure second, contribution and CTA next |
| Supporting work | Two cards in one row | Two columns only when each is at least about 340 px | Two independent stacked projects; no carousel |
| Audit preview | Two-row comparison matrix | Same matrix if labels remain readable | Two intent blocks with three labeled outcomes each |
| Recovery preview | Horizontal three-state sequence plus UI crop | Reduce annotations, preserve states | Vertical three-state sequence with one readable recovery-state crop |
| Funnel preview | Three horizontal stages | Same if readable | Three vertically ordered stages with labels beside values |
| Skills / experience | Main text with evidence in a side column | Narrower side column or stacked rows | Evidence links directly below each statement |
| Section spacing | 96–112 px | 72–88 px | 56–64 px |
| Interaction | Hover supplements focus and click | Pointer and touch both supported | No hover-dependent content or horizontal swiping requirement |

Mobile figures are redrawn to preserve the decision being shown. Do not shrink desktop screenshots until their labels become unreadable. Essential titles and CTAs are not truncated. At 320 px and with zoomed text, the page must reflow without horizontal scrolling.

On a roughly 390 × 844 phone, aim to show the selected-work heading or first project title near the bottom of the initial viewport. Do not create a full-screen introduction that postpones the work.

## 20. Motion system

| Interaction | Behavior | Duration |
|---|---|---|
| Initial hero | One gentle opacity reveal; text and actions available immediately | 220–280 ms |
| Project hover / focus | Border and surface change; optional 2 px vertical lift | 140–180 ms |
| Link underline | Short underline transition | 140 ms |
| CTA arrow | Move 2–3 px when its link is hovered or focused | 140 ms |
| Mobile menu | Brief opacity change with no elaborate choreography | 160–200 ms |
| Anchor navigation | Short smooth scroll when motion is allowed | Approximately 200–300 ms |

Use an ease-out feel. Avoid repeated section reveals, autoplaying project demos, parallax, background particles, custom cursors, and scroll hijacking. No diagram should appear to show changing live data.

With reduced motion requested, remove translation, use instant anchor navigation, and keep state changes immediate or near-immediate. Every component must communicate its state without animation.

## 21. Accessibility and usability

Target WCAG 2.2 AA for the future implementation. The recommended design uses at least 4.5:1 contrast for normal text and 3:1 for large text; the calculated palette pairs above meet those text thresholds. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

- Use one page-level heading and an ordered heading hierarchy. Project titles are headings within the work section.
- Make all actions keyboard accessible with a visible 2 px accent focus ring and approximately 3 px separation from the control.
- Use a preferred minimum target of **44 × 44 px** for buttons and mobile navigation. This is the portfolio's usability target, above WCAG 2.2's 24 × 24 CSS-pixel minimum where that criterion applies. [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Keep hover and focus behavior equivalent. A tooltip must never hold essential information.
- Use text labels for evidence states and chart outcomes. A colored dot alone is insufficient.
- Give informative figures concise descriptions; for example, “Illustrative funnel: 45 learners see fees, 18 show intent, and 8 pay per 100 demo attendees.” Hide purely decorative rules from assistive technology.
- Offer diagrams as readable text or tables on the case-study pages. Keep the PDF optional to the main web reading path; the supplied PDFs have not been audited for full accessibility.
- Preserve content at 200% text zoom and test reflow at 320 CSS pixels. Sticky navigation must not hide focused content.
- Label PDF and new-context actions clearly. Respect reduced-motion preferences.
- Keep the homepage light: no autoplay video, live prototype iframe, or unnecessary remote widgets. Reserve image dimensions and defer below-the-fold media.

## 22. Component inventory

| Component | Variants / states | Required behavior |
|---|---|---|
| Site header | Wide, compact, menu expanded | Clear destination labels; current-section cue |
| Text link | Rest, hover, focus, visited | Descriptive label; visible focus |
| Primary CTA | Rest, hover, focus, pressed | Strong contrast; no unexplained disabled state |
| Hero decision excerpt | Margin note, compact inline note | Links to the corresponding work |
| Section introduction | Title with optional one-sentence context | Consistent spacing and heading level |
| Featured project | Primary and secondary proportions | Distinct figure, status, contribution, clear actions |
| Supporting project | Half-width, stacked | Full essential copy visible without hover |
| Evidence label | Concept, illustrative baseline, reported snapshot | Text remains readable at small sizes |
| Project figure | Recovery flow, audit matrix, funnel, shopping journey | Source-derived content and nearby caption |
| Capability row | Three evidence-linked statements | Links to work or experience rather than a badge wall |
| Experience entry | Airtribe expanded, Wheels India compact | Accurate title, dates, activities, and optional detail |
| Education block | Degree plus certification text | Quiet visual weight |
| Contact block | Email, optional copy action, resume | Accurate destinations and honest feedback |
| Case-study reader header | Four project variants | Status, scope, contribution, PDF access |
| Case-study next step | Prototype or next case study | Clear return to Product Work |

## 23. Design tokens

These are design values for handoff, not implementation code.

| Token group | Values / rule |
|---|---|
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 96, 112 px |
| Content maximum | 1200 px |
| Reading measure | Approximately 680–720 px for long-form text |
| Grid gap | Desktop 24 px; tablet 20 px; mobile 16 px |
| Page edge | At least 48 px on desktop before max-width centering; tablet 32 px; mobile 20 px, narrow mobile 16 px |
| Section separation | Desktop 96–112 px; tablet 72–88 px; mobile 56–64 px |
| Card padding | Feature 40 px; support 28 px; mobile 20–24 px |
| Corner radius | Buttons 6 px; annotations 6 px; card/figure surfaces 10 px |
| Border | 1 px default; use control-boundary color where the edge conveys a control |
| Focus | 2 px accent ring, about 3 px offset |
| Header height | Desktop 72 px; mobile 64 px |
| CTA height | 48 px preferred; minimum touch target 44 px |
| Shadow | None at rest; optional faint shadow on featured hover only, about 6% opacity and 18 px blur |
| Image proportions | Featured figure approximately 4:3; supporting figure approximately 16:10; adapt composition on mobile |
| Type families | Newsreader display; Inter body/interface |
| Motion | 140–180 ms for controls; 220–280 ms for the single introductory reveal |

Color values are defined in Section 5 and type sizes in Section 6. Avoid adding one-off colors or spacing values to make an individual project feel special.

## 24. Desktop wireframe in text

```text
1440 px viewport / 1200 px content area

SUCHITHRA R                  Product Work   About   Experience   Contact
─────────────────────────────────────────────────────────────────────

PRODUCT / APM PORTFOLIO
Product thinking, grounded          FROM THE CANCELLATION CASE
in customer conversations.         Prioritize the next match.
Transition statement               Proposal + what to evaluate
[View Product Work →] [My Experience]

Selected product work
Four problems. Clear contribution and decisions.

┌───────────────────────────────────────────────────────────────────┐
│ RECOVERY FLOW + ONE UI CROP    Independent product concept         │
│ Matched → Cancelled           Reducing Repeat Driver Cancellations│
│          → Priority rematch   Problem / contribution / skills     │
│ Concept caption               [Case Study] [Explore Prototype]    │
└───────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ AI Visibility Audit          TWO-ROW AUDIT EXCERPT                │
│ Problem / contribution       Discovery and subscription          │
│ [View Case Study →]          Reported snapshot caption            │
└───────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐ ┌──────────────────────────────────┐
│ Demo → Payment Drop-off      │ │ Myntra Personal Shopping         │
│ ILLUSTRATIVE FUNNEL          │ │ Assistant                        │
│ Contribution + decision      │ │ SAVE → ALERT → RETURN            │
│ [View Case Study →]          │ │ Contribution + [Case Study →]   │
└──────────────────────────────┘ └──────────────────────────────────┘

What I bring to Product       Short transition narrative
How I think                   3 statements + evidence links
Experience                    Airtribe; compact Wheels India entry
Education and learning        Degree; relevant certification

Let’s talk about your next product problem.
[Email Suchithra →]            [View Resume (PDF)]   Bangalore, India
```

## 25. Mobile wireframe in text

```text
390 px viewport / single reading column

Suchithra R                                  Menu
─────────────────────────────────────────────────
PRODUCT / APM PORTFOLIO
Product thinking,
grounded in customer
conversations.
Short transition statement
[          View Product Work →          ]
My Experience
Small case-study decision excerpt

Selected product work

Reducing Repeat Driver Cancellations
Independent product concept
One-line problem
[Vertical recovery flow + readable UI crop]
Contribution / brief skills line
[View Case Study →]
[Explore Prototype ↗]

AI Visibility Audit
Problem
[Discovery block + subscription block]
Reported-snapshot caption
Contribution / [View Case Study →]

Demo → Payment Drop-off
[Vertical illustrative decision-stage funnel]
Contribution / [View Case Study →]

Myntra Personal Shopping Assistant
[Save → alert → return, stacked panels]
Contribution / [View Case Study →]

What I bring to Product
Short narrative
How I think — 3 stacked evidence-linked rows
Airtribe — title, dates, concise evidence
Wheels India — compact entry
Degree / certifications

Let’s talk about your next product problem.
[Email Suchithra →]
Visible email / Resume / Bangalore
```

This is a content sequence, not a fixed-height mockup. Longer text and user font settings must be allowed to expand every section.

## 26. Recommended page flow and reference interpretation

**Identity → Product work → Background → How she reasons → Professional evidence → Education → Contact.**

The [reference portfolio](https://dharani-murugaraj.vercel.app/) has clear section navigation, an explicit role introduction, numbered sections, project summaries, and a direct contact ending. Its observed content order is Hero → About → Experience → Technology → Selected Work → Contact.

Keep the useful principles of clear orientation and concise project entry points. For Suchithra, move Product Work immediately after the hero. Employment does not yet provide the main evidence of PM practice, so the case studies must do that work early. Replace the large technology taxonomy with three capabilities linked to evidence.

The recommended palette, typography, card compositions, diagrams, and copy are new proposals for this portfolio. The reference was inspected for content structure; this specification makes no claim to have audited its motion or responsive implementation.

### Case-study reading path

1. Understand the problem and the type of evidence available.
2. See Suchithra’s contribution and a key decision.
3. Follow causes, options, prioritization, and trade-offs.
4. Inspect proposed metrics, experiments, flows, or audit findings.
5. Understand assumptions and what needs validation.
6. Explore the prototype when available, then return to the portfolio or contact her.

## 27. Recruiter 20-second test

This is a design review scenario, not a completed user test.

| Time | What should be visible or understood | Evidence that earns the next click |
|---|---|---|
| 0–5 seconds | Suchithra's name, Product/APM intent, and customer-facing background | A specific headline plus an explicit transition statement |
| 5–10 seconds | The featured product problem and prototype availability | Recovery flow and “Explore Prototype” |
| 10–15 seconds | Her contribution includes prioritization, metrics, and experiments | One clear contribution line, not an unexplained project title |
| 15–20 seconds | The work spans marketplace recovery and AI visibility | A second feature with a different analytical artifact |
| 20–30 seconds | Where professional experience supports the transition | Direct Experience navigation and accurate Airtribe evidence |

**Why click a case study?** The preview gives a concrete question and one decision, then leaves room to inspect why that decision was made.

**Why believe the transition?** The work exposes her reasoning, while the resume supports customer discovery in a sales context, commercial judgment, and execution. Concept labels make the boundary clear.

**Risk of looking like a sales candidate:** a revenue-first hero, Demo → Payment as the only feature, or job history before work. This design places sales achievements in Experience and leads with broader product problems.

**Risk of overstating PM experience:** PM employment labels, ownership language, unqualified “research,” or outcome metrics presented as achieved. This design preserves job titles and names conceptual work explicitly.

Before implementation sign-off, ask a small set of target readers to view the layout briefly and answer: “What role is she targeting?”, “What has she actually done?”, “Which work would you open?”, and “Which claims are proposals?” Any confusion on the employment-versus-concept distinction is a content failure to fix.

## 28. Risks and things to avoid

| Risk | Design response |
|---|---|
| A generic “aspiring PM” impression | Show specific problems, decisions, and artifacts immediately |
| Revenue dominates the identity | Keep commercial metrics inside the accurately labeled Experience section |
| Case-study predictions look like results | Label illustrative baselines and targets beside the values; no homepage “impact” counters |
| AI audit looks like a deployed SaaS product | Describe a qualitative audit and reported findings; no fabricated score, intake, or live-tool CTA |
| Concept projects look like client employment | Independent-project labels; clear Myntra non-affiliation; no customer-logo banner |
| Sales discovery becomes an invented research program | Describe the real work precisely; proposed interviews remain future validation |
| Prototype suggests unsupported technical proficiency | State product flows and concept prototyping; avoid “built the platform” or a fabricated technology stack |
| An attractive preview loses analytical meaning | Pair every figure with a decision and evidence caption |
| Tiny diagrams on mobile | Recompose them as short vertical flows or labeled outcomes |
| Four case studies feel repetitive | Give each a distinct reasoning focus and visual structure |
| An unsupported fifth project enters scope | Keep the supplied Payment Reliability PDF outside this four-project design |
| Missing source details get filled with guesses | Omit unsupplied social URLs, certificate providers, project teams, personal motives, and availability claims |

### Source quality points to retain in the later case-study readers

- AI audit outcomes are reported snapshots with no raw response log supplied.
- Cancellation RICE inputs and retention values are illustrative; reason prevalence is unvalidated.
- Demo → Payment's company scenario, baselines, and impact estimates are assumptions and must not be attributed to Airtribe.
- Myntra's targets are proposed outcomes, and the work is independent.
- Resume achievements are source-reported professional claims; preserve their original scope and phase.

## 29. Final rationale

Suchithra's strongest credible story combines two kinds of evidence: real customer and commercial responsibilities, and product case studies that expose how she frames problems and makes decisions. The design gives each the appropriate role.

The cancellation prototype makes the Product transition tangible. The AI audit adds analytical range. Demo → Payment connects her background to a product question, and Myntra demonstrates consumer flows and scope choices. Airtribe then supplies professional context without changing the nature of her role.

Warm editorial typography gives the portfolio a human identity. Clear labels, readable diagrams, and direct navigation give recruiters a fast way to assess the work. The result should be remembered for the quality of the questions and decisions it presents.

---

## Source ledger and handoff notes

### Local sources reviewed

| Source | Relevant evidence | File |
|---|---|---|
| Resume, page 1 | Airtribe and Wheels India roles, dates, sales achievements, tools, education, certifications, contact | [Suchithra R resume](<D:/suchi portfolio web/Portfolio-Website/Suchithra_R_Resume_Sales_CS.pdf>) |
| AI Visibility Audit, all 14 pages | Five queries, three assistants, qualitative outcomes, recommendations, future-product boundary, limitations | [AI Visibility Audit](<D:/suchi portfolio web/Portfolio-Website/ai_visibility_audit_apm_case_study_suchithra_r.pdf>) |
| Cancellation case study, five-page revision, and current prototype | Taxonomy, metrics, RICE, pilots, recovery flow, driver interventions, Ops view | [Cancellation report](<D:/suchi portfolio web/Portfolio-Website/output/pdf/Reducing_Repeat_Driver_Cancellations_Case_Study.pdf>) · [Existing prototype](<D:/suchi portfolio web/Portfolio-Website/prototype/index.html>) |
| Myntra, all 11 pages | Recommendations, alerts, wishlist flows, phase decisions, targets, experiments, non-affiliation | [Myntra report](<D:/suchi portfolio web/Portfolio-Website/Suchithra_R_Myntra_AI_Shopping_Assistant_Report (1).pdf>) |
| Demo → Payment, all 11 pages | Illustrative funnel, objections, decision moments, RICE, experiment plans, learner-quality guardrails | [Demo → Payment report](<D:/suchi portfolio web/Portfolio-Website/Suchithra_R_Demo-to-Payment_Dropoff_Case_Study (1).pdf>) |

The PDF content was read, and the resume, audit scorecard, Myntra alert flow, and illustrative funnel were also visually inspected. The reference homepage was inspected for its visible content structure. External typography and accessibility sources are linked beside the relevant recommendations.

### Design handoff acceptance criteria

- The initial viewport identifies Suchithra, the Product transition, and the route into her work.
- The project order and copy follow this specification, with only four main projects.
- Every visual can be traced to a source concept, documented outcome, or clearly labeled illustration.
- Job titles and dates remain faithful to the resume.
- Navigation, project links, PDF links, and contact destinations are explicit.
- Mobile has readable recomposed figures and no hover dependency.
- The recommended palette, type hierarchy, states, and motion rules are applied consistently.
- The portfolio is ready for implementation only after its layouts and final content are reviewed; no website implementation is part of this deliverable.
