import { dataTable as table, note } from './components.mjs';
import { paymentHero, systemFigure, stateFigure, wireframes } from './payment-figures.mjs';

const disclosure = (label, content) => `<details class="payment-disclosure"><summary>${label}</summary>${content}</details>`;
const stats = (items, label) => `<div class="payment-stats" role="group" aria-label="${label}">${items.map(([value, meaning]) => `<div><strong>${value}</strong><span>${meaning}</span></div>`).join('')}</div>`;

export const paymentStudy = {
  discipline: 'Fintech / UPI',
  eyebrow: 'Product case study / Fintech / UPI',
  pageClass: 'payment-study',
  boundary: 'Independent case study. Not affiliated with super.money, Flipkart or any bank. Baselines, targets and sizing are illustrative assumptions.',
  hero: paymentHero(),
  sections: [
    { id: 'summary', nav: 'Executive summary', title: 'A pending payment becomes a trust problem.', content: `
      <p>When a UPI payment hangs on “Processing,” the user cannot tell whether money has moved. They may retry, risk paying twice, contact support, or switch apps. For a credit-first app, that uncertainty threatens the daily payment habit that credit adoption depends on.</p>
      <p class="small-label">Assumed baselines / proposed target · not measured results</p>
      ${stats([['1.2%', 'Attempts ending in pending'], ['45%', 'Users retry within 5 minutes of pending'], ['3.5', 'Tickets per 1,000 payments'], ['−35%', 'Target reduction in tickets']], 'Illustrative executive summary')}
      <p><strong>The product opportunity:</strong> the app cannot remove every delay across banks and the UPI network. It can say what is known, explain what it is waiting for, prevent harmful retries, and give a safe next step. Reconciliation and refund updates should close the loop automatically.</p>
      ${note('My contribution', 'I framed the pending-payment problem, mapped failure points and user reactions, defined reliability metrics, proposed recovery and trust interventions, prioritized them with RICE, and designed experiments. This is a proposal; it does not report completed tests or achieved outcomes.')}` },

    { id: 'context', nav: 'Context & system', title: 'Six layers. Different degrees of control.', content: `
      <p><strong>Assumed context:</strong> a credit-first UPI app in the mould of super.money, combining UPI payments, cashback, a co-branded credit card, and credit or installment options. As a Third-Party Application Provider (TPAP), the app depends on partner banks and the UPI switch.</p>
      ${systemFigure()}
      <p>The product owns app behavior and can improve device-side handling, but only partly controls the first layer. It must observe, coordinate, and communicate across the remaining layers. Changing NPCI or bank infrastructure, merchant apps, dispute adjudication, fraud engines, and payment rails is outside this case.</p>
      <h3>A small share of attempts, a difficult moment for each user.</h3>
      <p class="small-label">Assumed / illustrative baseline · per 1,000 payment attempts</p>
      ${stats([['955', 'Success'], ['25', 'Business declines: e.g. wrong PIN / low balance'], ['8', 'Technical declines'], ['12', 'Pending over 30 seconds']], 'Assumed outcomes of 1,000 payment attempts')}` },

    { id: 'users', nav: 'Users & moments', title: 'The same state creates different anxieties.', content: `
      <div class="payment-segments">${[
        ['Everyday QR payers', 'Small payment at a shop counter. The merchant is waiting; the user needs quick, believable payment-status proof.'],
        ['Bill and rent payers', 'Medium payment near a due date. The user needs clear status and a safe next step.'],
        ['High-value payers', 'Large, one-off payment. Reassurance needs facts and an expected timeline.'],
        ['Credit-line users', 'Credit or installment payment. The user needs both payment status and credit-limit status.'],
      ].map(([title, copy]) => `<div><h3>${title}</h3><p>${copy}</p></div>`).join('')}</div>
      <h3>Five moments after “Processing” appears</h3>
      <ol class="payment-timeline">${[
        ['M1', 'At the counter', '0–30 seconds', 'Show real status and what is safe to do.'],
        ['M2', 'Leaving', '1–10 minutes', 'Warn against duplicate payments and offer proof.'],
        ['M3', 'Checking elsewhere', '10 minutes–hours', 'Push the final status as soon as it is known.'],
        ['M4', 'Next day', 'T+1', 'Show refund progress and an expected date.'],
        ['M5', 'After resolution', 'Days later', 'Close the loop, hold back offers, and repair trust.'],
      ].map(([id, title, time, response]) => `<li><span class="small-label">${id} / ${time}</span><strong>${title}</strong><p>${response}</p></li>`).join('')}</ol>` },

    { id: 'states', nav: 'Payment states', title: 'The pending path is where the user is left alone.', content: `
      ${stateFigure()}
      <p>A final bank response may arrive later. The design task is to make this intermediate state understandable: what is known, what is safe to do, and when the user will hear next.</p>
      ${note('Design the state', 'A status message and an actual resolution are different events. Measure time to first clear message separately from time in pending; only the first is fully controlled by the app.')}` },

    { id: 'reactions', nav: 'User reactions', title: 'Every reaction is an attempt to find certainty.', content: `
      <figure class="payment-reactions"><figcaption>Assumed illustrative split after a pending payment · requires behavioral validation</figcaption><dl>${[
        ['Retry within 5 minutes', 45], ['Wait for an update', 22], ['Check elsewhere / ask merchant', 16], ['Contact support / bank', 12], ['Switch or leave', 5],
      ].map(([label, value]) => `<div><dt>${label}</dt><dd><span class="payment-reaction-bar" style="--share: ${value}%" aria-hidden="true"></span><strong>${value}%</strong></dd></div>`).join('')}</dl></figure>
      ${disclosure('Seven reactions: why they happen, risks, and product responses', table('Reaction map from the case study · hypotheses to validate', ['Reaction', 'Why / risk', 'Product response'], [
        ['Retry immediately', 'Maybe it did not go through → duplicate payment.', 'Duplicate guard and “please don’t pay again yet.”'],
        ['Wait and stare', 'No information to act on → anxiety and abandonment.', 'Live status with an expected time.'],
        ['Check bank SMS / another app', 'Needs a second source of truth → conflicting statuses.', 'Consistent status and the same bank reference.'],
        ['Ask the merchant', 'Merchant needs confirmation → pressure and disputes.', 'Shareable, verifiable status proof.'],
        ['Contact support', 'No self-serve answer → cost and long waits.', 'Status, refund tracking, and prefilled tickets.'],
        ['Switch app or method', 'Trusts another method more → lost customer.', 'Preflight bank health and alternatives.'],
        ['Abandon the purchase', 'Stress and uncertainty → lost transaction.', 'Fast, honest resolution and an easy “pay again” once safe.'],
      ]))}` },

    { id: 'measurement', nav: 'Success metrics', title: 'Measure a confident outcome.', content: `
      <div class="payment-north-star"><span class="small-label">North star / illustrative baseline → target</span><h3>Confident outcome rate</h3><div class="payment-target">95% <span aria-hidden="true">→</span><span class="sr-only">to</span> 97%</div><p>Share of payment attempts that end in a clear final state within 30 seconds, with no uncertainty-driven retry and no support contact. A failure needs a clear next step.</p></div>
      ${table('Illustrative assumptions and proposed targets · no measured improvement is claimed', ['Metric', 'Definition', 'Baseline → target'], [
        ['Pending rate', 'Attempts pending over 30 seconds ÷ all attempts.', '1.2% → 0.9%'],
        ['Retry within 5 minutes', 'Users re-attempting the same payment ÷ users seeing pending.', '45% → 20%'],
        ['Duplicate-success rate', 'Retries where both payments succeed ÷ retries.', '10% → 3%'],
        ['Tickets per 1,000 payments', 'Payment-related contacts ÷ payments × 1,000.', '3.5 → 2.3'],
        ['30-day retention gap', 'Retention of pending-exposed users minus non-exposed users.', '−7 pts → −3 pts'],
        ['Credit conversion after incident', 'Credit activation within 14 days of a resolved pending event.', '4% → 5%'],
      ])}
      <p><strong>Diagnostic signals:</strong> time in pending (p50 / p95), app-side timeouts, technical declines by bank, back-press / abandonment, switching apps, and payment CSAT.</p>
      ${note('Guardrails', 'False reassurance rate · NPCI status-check limit breaches · Added checkout latency · Fraud via fake proofs. Lower ticket volume only counts as progress alongside resolution, CSAT, and retention.')}` },

    { id: 'solutions', nav: 'Four solutions', title: 'Give the user a next step. Own the follow-through.', content: `
      <div class="payment-solutions">${[
        ['A', 'Honest pending state + duplicate guard', 'M1–M3 / reduce harmful retries', 'After a short threshold, replace the spinner with a tracker: what happened, what the system is waiting for, approximate duration, and what is known about the money. Update from callbacks.', 'Warn against paying again. Check for the same payee and amount within ten minutes, provide verifiable merchant proof, and keep help available.', 'Risk: false reassurance and fake screenshots.'],
        ['B', 'Automated recovery + refund tracking', 'M3–M5 / resolve uncertainty', 'Reconcile server-side and push the final result. Show refund progress and an expected date; automatically escalate a dispute if overdue and show compensation where applicable.', 'On failure, release the blocked credit limit and show the change. Partner reversal data and engineering review are prerequisites.', 'Risk: fewer contacts can conceal unresolved problems.'],
        ['C', 'Preflight reliability routing', 'Before payment / improve first-attempt outcomes', 'Track success rates by bank and time window. If the source bank is degraded, warn before payment and offer a healthier linked account or credit line.', 'The user chooses; never switch funds silently. Start in shadow mode to compare predictions with outcomes before showing warnings.', 'Risk: over-warning can suppress useful payments.'],
        ['D', 'Cross-sell guard + trust repair', 'After an incident / earn the next interaction', 'Suppress credit prompts for 48 hours after a pending or failed payment, or until resolution, as proposed in the report. After resolution, send a short “sorted” message.', 'Test an optional goodwill reward in a small cohort before scaling. Resolve the exact suppression-window rule before the experiment.', 'Risk: goodwill cost and gaming; protect complaints and offer revenue.'],
      ].map(([id, title, moment, copy, behavior, risk]) => `<div><span class="payment-solution-letter" aria-hidden="true">${id}</span><div><span class="small-label">${moment}</span><h3>${title}</h3><p>${copy}</p><p>${behavior}</p><p class="caption">${risk}</p></div></div>`).join('')}</div>` },

    { id: 'wireframes', nav: 'Product concepts', title: 'From a spinner to an understandable state.', content: `
      <p>Six low-fidelity wireframes adapted from the PDF. These show proposed structure and behavior, with illustrative transaction details; they are not production UI or working payment controls.</p>
      ${wireframes()}
      ${note('Copy to validate before launch', 'The source’s “Your money is safe” line and 2–5 minute estimate are concept copy, not guarantees. Reassurance must reflect the known transaction state. Refund dates and compensation require current rules and partner data. Pending proof must never imply that the merchant has received funds.')}` },

    { id: 'prioritization', nav: 'RICE & roadmap', title: 'The cheapest protection ships with the actual fix.', content: `
      <p>Reach is the share of active users touched per quarter; impact uses 1 for medium and 2 for high. Effort is in person-months. RICE = reach × impact × confidence ÷ effort.</p>
      ${table('RICE prioritization · all inputs are illustrative assumptions', ['Candidate', 'Reach', 'Impact', 'Confidence', 'Effort', 'RICE'], [
        ['D. Cross-sell guard & trust repair', '25', '1', '80%', '1', '20.0'],
        ['A. Honest pending state & duplicate guard', '25', '2', '80%', '2.5', '16.0'],
        ['B. Automated recovery & refund tracking', '25', '2', '60%', '4', '7.5'],
        ['C. Preflight reliability routing', '60', '1', '50%', '5', '6.0'],
        ['E. Failure-prediction model', '60', '1', '30%', '6', '3.0'],
      ])}
      ${note('Reading the scores', 'D ranks highest because it is inexpensive, but it protects the next interaction rather than fixing the pending experience. A is the actual product fix and ships alongside D. B depends on partner data; C and E need bank-health signals that are not yet established. Keep E parked.')}
      <h3>A phased roadmap with evidence at each step</h3>
      <ol class="payment-roadmap">${[
        ['Phase 0', 'Weeks 0–3', 'Instrument payment state changes, classify tickets, mine reviews, and establish baselines.', 'Exit: trusted metric baselines.'],
        ['Phase 1', 'Weeks 3–10', 'Ship the honest pending state, duplicate guard, and cross-sell guard.', 'Exit: retries fall with guardrails flat.'],
        ['Phase 2', 'Weeks 10–20', 'Add automated recovery, refund tracking, and credit-limit release.', 'Exit: tickets trend toward target alongside actual resolution.'],
        ['Phase 3', 'Weeks 20–32', 'Run preflight routing in shadow mode, then a live cohort. Keep failure prediction parked.', 'Exit: warning precision supports going live.'],
      ].map(([phase, weeks, copy, exit]) => `<li><span class="small-label">${phase} / ${weeks}</span><p>${copy}</p><span class="caption">${exit}</span></li>`).join('')}</ol>` },

    { id: 'experiments', nav: 'Experiment plan', title: 'Test whether uncertainty actually falls.', content: `
      ${table('Proposed experiments · no tests or results are claimed', ['Test & hypothesis', 'Design', 'Primary metric / guardrails'], [
        ['1. Pending state (A): honest status reduces harmful retries.', '50/50 among users who see pending. Two weeks, followed by a 30-day retention read.', 'Retry within 5 minutes. Protect false reassurance rate and latency.'],
        ['2. Cross-sell guard (D): pausing offers raises later conversion.', '50/50 incident cohort; the report describes assignment after resolution. Align assignment and suppression timing before launch. Proposed runtime: three weeks.', '14-day credit activation. Protect complaints and offer revenue.'],
        ['3. Recovery (B): tracking and automatic dispute escalation reduce contacts.', 'Staggered rollout with a 10% holdout. Proposed runtime: six weeks.', 'Tickets per 1,000 payments. Protect CSAT and resolution within turnaround time (TAT).'],
        ['4. Preflight (C): early warnings improve first-attempt success.', 'Shadow mode for four weeks, then 50/50 live for four weeks.', 'Confident outcome rate. Protect abandonment after warning and false positives.'],
      ])}
      <p>Randomize at user level and stratify by bank. Run across full weeks to account for month-end, peak hours, and bank outages. Treat major outages as a separate segment.</p>
      <p><strong>Decision rule:</strong> read refund-adjusted outcomes and retained users alongside ticket volume. Support deflection alone can hide unresolved payments.</p>` },

    { id: 'limitations', nav: 'Risks & assumptions', title: 'Trust depends on what remains unproven.', content: `
      <p>The case provides a problem frame and proposed interventions. Payment telemetry, user research, partner capabilities, and experimental evidence still need to establish whether they work.</p>
      ${disclosure('Risks and constraints: nine safeguards', table('Risk → proposed mitigation', ['Risk', 'Mitigation'], [
        ['False reassurance', 'State timelines, not guarantees; monitor mismatches between copy and actual status.'],
        ['Fake payment proofs', 'Verifiable receipts, short expiry, and minimal fields.'],
        ['Over-warning', 'Tune thresholds, start in shadow mode, and measure abandonment.'],
        ['NPCI / API limits', 'Use callback-driven updates and backoff; respect applicable limits.'],
        ['Partner dependency', 'Establish data-sharing agreements and escalation paths.'],
        ['Blame-shifting tone', 'Use neutral, factual wording.'],
        ['Privacy', 'Minimize shared proof data and expire links.'],
        ['Hidden problems', 'Track resolution, CSAT, and retention together.'],
        ['Compliance', 'Verify current RBI and NPCI primary circulars before launch.'],
      ]))}
      ${disclosure('Assumptions and open questions: what evidence is needed', table('Validation still to do', ['Assumption', 'Evidence needed / owner'], [
        ['Baselines for pending, retries, duplicates, tickets, and retention', 'Payment event logs, ticket taxonomy, and cohort analysis / Data.'],
        ['Pending distribution by bank, hour, and month-end', 'Analytics by partner and time window / Data & Payments.'],
        ['User reactions after pending', 'Session replays, short surveys, and support transcripts / Research.'],
        ['Partner health and reversal data availability', 'Discovery with PSP and banks / Partnerships.'],
        ['Credit-line payments follow the same states', 'Credit integration and limit-release review / Engineering.'],
        ['Goodwill reward cost and effect', 'Small controlled pilot / Growth & Finance.'],
      ]))}
      ${note('Before launch', 'Regulatory points should be confirmed against current RBI and NPCI primary circulars before launch.')}` },

    { id: 'sources', nav: 'Sources', title: 'Source transparency', content: `
      <p>This reader adapts Suchithra R’s September 2026 report. Secondary sources below are those listed in the PDF; they provide context, not validation of its assumed baselines or proposed outcomes. No customer interviews, production data, or completed A/B tests are claimed.</p>
      ${disclosure('Secondary sources listed in the report', table('Source attribution as supplied · URLs are not independently verified', ['Source', 'Used for in the PDF'], [
        ['Google Play / super.money reviews', 'Anecdotal reports of stuck payments.'],
        ['Credyfi', 'Launch and product positioning.'],
        ['TechTimes', 'SplitStore launch and UPI fee legislation context.'],
        ['D91 Labs', 'Technical declines and reported NPCI operating limits.'],
        ['productgrowth.in', 'NPCI decline metrics and UPI volume.'],
        ['Ujjivan Small Finance Bank', 'Reversal timelines and compensation context.'],
        ['Zee News', 'RBI turnaround-time framework context.'],
      ]))}
      <p>Source links are preserved in the downloadable PDF. Some are partial article or section paths; this reader does not reconstruct missing URLs.</p>` },
  ],
};
