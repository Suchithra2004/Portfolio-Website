import { paymentStudy } from './payment-study.mjs';
import { dataTable as table, note, recoveryFigure, auditFigure, funnelFigure, shoppingFigure } from './components.mjs';

// Reader copy is condensed from the supplied PDFs. Numerical inputs retain their evidence labels.
export const caseStudies = {
  'payment-reliability': paymentStudy,
  'driver-cancellations': {
    discipline: 'Marketplace recovery',
    boundary: 'A product concept with illustrative assumptions. No production telemetry, interviews, or measured pilot outcomes are claimed.',
    sections: [
      { id: 'problem', title: 'A match is a promise the rider starts to trust.', content: `
        <p>A rider sees a driver, vehicle, and pickup estimate. Then the driver cancels. The rider waits for a new match and may encounter the same conditions again. The problem becomes a sequence of failed matches, rather than a single interruption.</p>
        <p>The product opportunity has two horizons: <strong>recover the current rider</strong> and <strong>reduce the next cancellation</strong>. Priority rematching addresses recovery. Better driver context, a targeted fare floor, and direction-aware matching address possible causes.</p>
        ${note('Scenario and inference', 'The matched-then-cancelled sequence is the design scenario. Increased abandonment and weaker rider return are hypotheses to validate with request-level and rider-cohort data.')}` },
      { id: 'contribution', title: 'What this work produced', content: `
        <p>I organized cancellation reasons into a taxonomy, defined a marketplace metrics tree, compared three interventions with RICE, and outlined two pilots. The concept prototype makes the proposed rider recovery, driver decision, and Ops monitoring flows inspectable.</p>
        <ul><li>A reason-specific approach to driver cancellation.</li><li>A recovery flow that preserves the rider’s request.</li><li>Spiral Exposure Rate to make repeat cancellations visible.</li><li>Experiment plans with marketplace and margin guardrails.</li></ul>` },
      { id: 'diagnosis', title: 'Different reasons need different responses.', content: `
        <p>A generic “Are you sure?” prompt cannot address an earnings concern and a traffic delay equally well. The taxonomy connects each hypothesis to a potential signal and intervention.</p>
        ${table('Candidate reasons; their prevalence requires validation.', ['Reason', 'Signal to inspect', 'Product response'], [
          ['Low fare', 'Fare relative to trip distance and effort; driver reason code.', 'Make guaranteed earnings clear and test a targeted fare floor.'],
          ['Wrong direction', 'Declared destination or heading versus the trip direction.', 'Show route fit; later explore soft pre-match compatibility.'],
          ['Traffic / pickup ETA', 'Quoted pickup time versus updated conditions.', 'Show the updated pickup context before confirmation.'],
          ['Rider no-show risk', 'Verified wait or no-show data, where appropriate.', 'Investigate privacy and fairness before exposing rider history.'],
        ])}
        <p>The report does not establish the largest reason category. That ranking must come from reliable reason-code capture before it can justify investment.</p>` },
      { id: 'options', title: 'Recover quickly, then address structural causes.', content: `
        <h3>1. Reason-specific nudges + priority rematch</h3><p>Show relevant context before the driver confirms cancellation. If the driver still cancels, prioritize the rider’s next matching pass. This reaches the full cancellation scenario, but it does not remove an underlying economic or direction mismatch.</p>
        <h3>2. Fare-floor guarantee</h3><p>Guarantee a minimum payout for eligible short or low-value trips. This directly addresses an earnings concern, with a real trade-off in subsidy cost, margin, and possible rider fare effects.</p>
        <h3>3. Direction compatibility</h3><p>Use a driver’s declared heading as a soft pre-match signal. Preventing mismatches may help, but filtering too aggressively can lower Match Rate or increase time to match.</p>` },
      { id: 'prioritization', title: 'Start with recovery; test the costlier levers next.', content: `
        <p>The illustrative model assumes 100,000 monthly matched rides and an 8% driver-cancellation rate, or 8,000 affected rides. RICE combines reach, impact, confidence, and effort. Effort below is in person-weeks.</p>
        ${table('Illustrative prioritization inputs — not forecasts or measured results.', ['Solution', 'Reach', 'Impact', 'Confidence', 'Effort', 'RICE'], [
          ['Nudges + priority rematch', '8,000', '1', '70%', '3', '~1,867'],
          ['Fare-floor guarantee', '3,200', '2', '75%', '4', '~1,200'],
          ['Direction compatibility', '2,000', '1.5', '65%', '8', '~244'],
        ])}
        <p><strong>Recommended sequence:</strong> pilot recovery first, model and test the fare floor next, then consider direction compatibility once the Match Rate trade-off is understood. Replace reach assumptions with real reason-code data before funding a rollout.</p>` },
      { id: 'prototype', title: 'Make the recovery visible.', content: `
        ${recoveryFigure()}
        <p>The rider moves through matched, cancelled, priority rematching, and a new match. The driver sees a sample fare floor and a different nudge for low fare, wrong direction, traffic, or other reasons. Cancellation remains available.</p>
        <p>The Ops view combines metric definitions with the report’s illustrative retention values and a conceptual pilot trend. It is explicitly labeled as prototype data.</p>
        <a class="button" href="/prototype/">Explore Prototype <span aria-hidden="true">↗</span></a>` },
      { id: 'measurement', title: 'Measure the spiral and protect the marketplace.', content: `
        <p><strong>North star:</strong> completed rides per request. <strong>Spiral Exposure Rate:</strong> the share of eligible requests with two or more driver cancellations before completion or abandonment.</p>
        ${table('Supporting marketplace metrics', ['Metric', 'Definition'], [
          ['Match Rate', 'Requests matched with a driver / eligible requests.'],
          ['Driver-Accept Rate, as named in the report', 'Matched requests progressing to trip start without driver cancellation / matched requests. This is post-match progression, not incoming-offer acceptance.'],
          ['Completion Rate', 'Completed rides / started rides.'],
          ['Rider Retention', 'Return within 7 or 30 days, compared by cancellation exposure.'],
        ])}
        ${table('Illustrative 7-day return pattern; no causal effect is established.', ['Cancellations before completion', 'Illustrative return rate'], [['0', '68%'], ['1', '51%'], ['2+', '34%']])}
        <h3>Pilot 1: nudges + priority rematch</h3><p>Compare the paired intervention with the existing cancellation and requeue flow. Use a marketplace-aware assignment design and account for driver and matching-pool spillover. Spiral Exposure Rate is primary; rider return is a slower supporting signal.</p><p>Guardrails include Match Rate, post-match progression, time to rematch, driver availability, and support contacts. Specify sample size and the decision window using real baseline volume before launch.</p>
        <h3>Pilot 2: targeted fare floor</h3><p>Compare eligible trips across comparable zones or windows. Measure low-fare cancellations and protect rider fare, driver supply-hours, completed rides per request, and contribution margin. Monitor cross-zone movement and pricing spillover.</p>` },
      { id: 'limitations', title: 'What the concept does not establish', content: `
        <ul><li>The 8% cancellation assumption, reason reach, RICE inputs, and retention values are illustrative.</li><li>Reason codes may be missing or inconsistent. Instrumentation quality is a gate before interpretation.</li><li>The prototype demonstrates UX and decision logic; it does not implement matching, traffic prediction, or real payouts.</li><li>A downward conceptual trend is not evidence of pilot impact.</li></ul>` },
      { id: 'next', title: 'The next useful learning', content: `
        <p>Validate reason capture and cancellation sequences first. Then measure whether priority rematching reduces repeat cancellations and time to a stable match without damaging overall matching.</p>
        <p>If rider recovery improves while low-fare nudges do little, retain the recovery flow and isolate the payout lever in a later test. If direction compatibility reduces Match Rate, relax or remove that constraint.</p>
        ${note('What I would look for', 'A reduction in repeat exposure that holds alongside healthy matching, trip completion, driver availability, and later rider return.')}` },
    ],
  },
  'ai-visibility-audit': {
    discipline: 'AI search and measurement',
    boundary: 'An analysis of a published qualitative audit. Findings are historical reported observations; underlying response logs were not supplied.',
    sections: [
      { id: 'problem', title: 'Being searchable does not guarantee being mentioned.', content: `
        <p>A conventional search position does not tell a team whether an AI answer will recommend, omit, or misdescribe its brand. A strong answer to a branded question can conceal a gap in category discovery.</p>
        <p>The case asks: <strong>does a specialty coffee brand appear, get described accurately, and have credible supporting sources when buyers ask relevant questions?</strong> The opportunity is to make those differences visible by intent, assistant, and evidence source.</p>` },
      { id: 'contribution', title: 'What this work produced', content: `
        <p>I synthesized the published audit’s query-level outcomes into visibility gaps, sequenced its recommendations, and defined how repeatable measurement could work. The analysis distinguishes the current read-only audit from a possible future product.</p>
        <ul><li>A view across five buyer-intent queries and three assistants.</li><li>Six dimensions for reviewing answer quality.</li><li>Five recommendations connected to observed gaps.</li><li>A repeat-audit proposal and a measurement plan.</li></ul>` },
      { id: 'method', title: 'Compare the same questions across assistants.', content: `
        <p>The documented manual workflow frames buyer intent, runs identical prompts, collects responses, checks accuracy, finds gaps, prioritizes fixes, and presents recommendations.</p>
        ${table('The report’s five buyer-intent stages', ['Intent', 'Question focus'], [
          ['Discovery', 'Finding a South Indian filter-coffee brand online.'],
          ['Comparison', 'Comparing the brand with a competitor for daily coffee.'],
          ['Consideration', 'Choosing a subscription to try different roasts.'],
          ['Use-case', 'Whether the brand suits cold brew.'],
          ['Trust', 'Why the brand is considered good.'],
        ])}
        <p>The site names ChatGPT, Gemini, and Perplexity, producing a 5 × 3 comparison. It reports recording mentions, descriptions, and sources. The underlying transcripts, individual run timestamps, repeated samples, and scoring formula are not available in the supplied material.</p>
        ${note('Measurement boundary', 'The six dimensions are a framework: visibility, accuracy, citation quality, intent matching, brand positioning, and authority signals. No validated 0–100 score is published.')}` },
      { id: 'findings', title: 'The gap changes with buyer intent.', content: `
        ${auditFigure()}
        <h3>Category discovery is the clearest reported gap.</h3><p>The brand is absent from all three generic discovery answers, while the source reports a win in all three branded comparisons. This suggests evaluating category discovery and branded recall separately.</p>
        <h3>Consideration varies by assistant.</h3><p>The subscription answer ranks first in ChatGPT, second in Gemini, and is absent in Perplexity. One favorable answer is not enough to infer broad visibility.</p>
        <h3>A correct mention can have weak supporting evidence.</h3><p>The source marks several Perplexity answers as correct but supported by weaker sources. Citation quality therefore matters alongside presence.</p>
        ${note('Inference, not demonstrated cause', 'The source suggests missing schema as a root cause. The audit does not isolate schema’s effect, so this remains a hypothesis to test.')}` },
      { id: 'prioritization', title: 'Connect each gap to an action.', content: `
        ${table('Reported impact/effort judgments; measured lift is not supplied.', ['Sequence', 'Recommendation', 'Why this order'], [
          ['1', 'Clarify category content', 'Address discovery absence with category-specific pages and product language; high impact / low effort in the source.'],
          ['2', 'Add structured information', 'Improve machine-readable product and organization information; validate with a re-audit.'],
          ['3', 'Reframe subscription copy', 'Make roast variety clearer for consideration queries; medium effort.'],
          ['4', 'Build credible external coverage', 'Broaden relevant supporting evidence through reviews and roundups; higher effort.'],
          ['5', 'Expand category presence', 'Build sustained category education and listings after the on-site foundation.'],
        ])}
        <p>The trade-off is between changes a team can directly make and external authority work with less predictable execution. The sequence makes dependencies explicit rather than treating every recommendation as equally immediate.</p>` },
      { id: 'product', title: 'From a one-time report to repeatable evidence.', content: `
        <p>The current published experience presents one audit, its method, scorecard, and expandable recommendations. It has no visitor audit intake, account, live monitoring dashboard, or historical workflow.</p>
        <p>A future product could first save prompts, model versions, run dates, and raw answers. Query-level trends, competitor comparisons, citation review, and action tracking would follow that evidence foundation.</p>
        ${note('Proposed product sequence', 'Capture reproducible evidence → compare runs → connect recommendations to re-audits. Trends are only useful when the underlying runs can be compared.')}` },
      { id: 'measurement', title: 'Measure whether the audit changes a decision.', content: `
        <p><strong>Proposed north star:</strong> teams completing a repeat audit and making at least one documented decision from it.</p>
        ${table('Proposed metrics for a future audit tool', ['Stage', 'Metric', 'Question'], [
          ['Acquisition', 'Qualified audit starts', 'Does the problem attract relevant teams?'],
          ['Activation', 'Completed first audit', 'Does a team reach a usable baseline?'],
          ['Engagement', 'Findings reviewed and actions saved', 'Does the output inform work?'],
          ['Retention', 'Repeat audits in a defined interval', 'Is monitoring worth returning for?'],
          ['Outcome', 'Gap closure by intent over time', 'Does the tracked discovery problem change?'],
        ])}
        <p>Report movement alongside the prompts, model versions, and source evidence. A changed answer needs context before it can be interpreted as improvement.</p>` },
      { id: 'limitations', title: 'A snapshot supplies questions, not certainty.', content: `
        <ul><li>Five prompts cover selected intents, not the full range of buyer language.</li><li>Answers can vary by wording, account, run, time, and model updates.</li><li>Raw transcripts and individual timestamps are not available.</li><li>The dimensions have no published numerical rubric or overall formula.</li><li>Absence alone does not prove that schema, content, or citations caused the gap.</li><li>The suggested user roles are inferred from the workflow; no user interviews are documented.</li></ul>` },
      { id: 'next', title: 'Repeat a frozen prompt set before scaling.', content: `
        <p>Archive the raw answers from repeated runs using a fixed prompt set. Then compare outcomes after individual content or evidence changes, keeping prompts and model details visible.</p>
        <p>The useful next question is whether a gap persists, and whether a proposed action coincides with a consistent change. That would make the next recommendation more defensible than a single favorable response.</p>` },
    ],
  },
  'demo-to-payment': {
    discipline: 'Edtech decisions and conversion',
    boundary: 'An independent illustrative edtech case. Company context, funnel baselines, objection shares, and impact estimates are assumptions, not Airtribe analytics.',
    sections: [
      { id: 'problem', title: 'Interest does not resolve the decision to pay.', content: `
        <p>The case considers a six-month upskilling program sold through a demo and a counselor conversation. The illustrative scenario uses a ticket of around ₹80,000. Learners have shown interest, but still face questions about affordability, outcomes, fit, and trust.</p>
        <p>The focus is the decision zone after fees are shared, plus the end of the demo. Counselor connection speed and sales operations are acknowledged but kept outside the proposed product scope.</p>
        ${funnelFigure()}
        <p>The full illustrative funnel is <strong>100 attended → 62 engaged → 52 connected → 45 saw fees → 18 showed intent → 8 paid</strong>. The post-price steps lose 37 learners per 100 attendees in this scenario. These values locate a hypothetical problem; they do not describe a company’s performance.</p>` },
      { id: 'contribution', title: 'What this work produced', content: `
        <p>I mapped objections to the moments where they may arise, built a funnel metrics tree, compared three interventions with RICE, and outlined a staged validation plan. The proposed solutions emphasize total-cost clarity, relevant proof, and realistic fit.</p>
        <p>The guardrails ask whether new enrollees remain a good fit, rather than judging every additional payment as success.</p>` },
      { id: 'diagnosis', title: 'Listen for the uncertainty behind the objection.', content: `
        <p>“Too expensive” could describe affordability, unclear payback, or a lack of trust. Those possibilities lead to different responses. The taxonomy is a set of hypotheses to investigate through lost-reason data and proposed interviews.</p>
        ${table('Hypothesized objection families', ['Family', 'Possible uncertainty', 'Product opportunity'], [
          ['Price and affordability', 'Monthly burden, total payable, financing eligibility.', 'Show total cost, EMI detail, and a clear fallback.'],
          ['Outcome and job', 'Whether the program is relevant to someone with this background.', 'Provide matched, verifiable evidence and realistic outcome framing.'],
          ['Time and fit', 'Weekly effort, readiness, and the risk of falling behind.', 'Show a realistic week and a fit check.'],
          ['Trust and credibility', 'Pressure, unverifiable claims, refund uncertainty.', 'Make proof and policy easy to verify.'],
          ['Decision process', 'Family approval, comparison, or postponement.', 'Make information shareable with a co-decider.'],
        ])}
        <p>The moment map separates the end of the demo, counselor call, price reveal, EMI check, and follow-up days. The same proof is unlikely to answer every question at every moment.</p>` },
      { id: 'options', title: 'Three ways to make the next choice clearer.', content: `
        <h3>A. Personalized Outcome Preview</h3><p>A short post-demo experience connects a learner’s starting point and weekly availability to a skill-gap map, realistic week, sample project, and sourced outcome ranges. If the fit is poor, the experience should say so and suggest a prerequisite path.</p>
        <h3>B. EMI and Total-Cost Clarity</h3><p>A panel at price reveal shows monthly EMI, interest, processing fees, and total payable together. Eligibility context, refund and pause policy, and a shareable family summary address uncertainty at the decision point.</p>
        <h3>C. Moment-Matched Alumni Proof</h3><p>Replace generic testimonials with relevant, verifiable alumni evidence. Cohort claims need definitions, denominators, and dates; a peer-call option adds operational and consent costs.</p>
        ${note('Trade-off', 'Clear total cost or an honest fit assessment may reduce immediate conversion. The proposal judges the quality of conversion through refunds, engagement, and financing guardrails.')}
        <p>Blanket discounts and urgency timers were not prioritized. A pay-after-placement model would add business-model risk beyond a funnel change.</p>` },
      { id: 'prioritization', title: 'Clarity first; validate personalization cheaply.', content: `
        <p>The source assumes 30,000 demo attendees per quarter. RICE effort is in person-months and all inputs are illustrative.</p>
        ${table('Illustrative RICE model', ['Solution', 'Reach / quarter', 'Impact', 'Confidence', 'Effort', 'RICE'], [
          ['B. Total-Cost Clarity', '22,500', '1', '80%', '1.5', '12,000'],
          ['C. Alumni Proof', '24,000', '2', '70%', '3', '11,200'],
          ['A. Outcome Preview', '18,000', '2', '50%', '5', '3,600'],
        ])}
        <p>B and C are close. The recommendation starts with the lower-effort clarity layer, follows with proof at relevant moments, and tests the personalized preview manually before a larger build. Stronger alumni supply or lower preview effort could change the ranking.</p>` },
      { id: 'measurement', title: 'Count good decisions, not just payments.', content: `
        <p><strong>North star:</strong> demo-to-paid conversion. Diagnose fee-shared-to-intent and intent-to-paid separately, then track use of the cost calculator, proof exposure, EMI completion, and time from intent to payment.</p>
        ${table('Proposed experiments and safeguards', ['Intervention', 'Test', 'Measure and protect'], [
          ['Total-Cost Clarity', 'Compare the current fee message with a cost panel, eligibility context, and a shareable summary.', 'Primary: fee shared → intent. Guardrails: refunds, loan defaults/cancellations, counselor CSAT.'],
          ['Matched Alumni Proof', 'Compare generic proof, matched proof, and matched proof plus a peer-call offer.', 'Evaluate paid conversion with a consistent eligible cohort and denominator. Protect claim accuracy, refund rate, and alumni workload.'],
          ['Outcome Preview', 'Start with a concierge test; only move to a randomized lightweight build if there is a useful signal.', 'Treat self-selected completer comparisons as directional. Validate causal impact in the randomized follow-up.'],
        ])}
        <p>Before launch, instrument events, audit lost-reason coding, conduct the proposed learner interviews, and check tracking and assignment quality. The source’s interview counts and test parameters describe planned work, not completed research.</p>
        ${note('Experiment detail to resolve', 'The source’s alumni-proof plan names an S2-eligible population but an S6/S1 primary ratio. Eligibility, assignment, and the metric denominator must be made consistent before a live experiment. This reader does not present the sample-size estimates as validated.')}` },
      { id: 'limitations', title: 'What would need evidence', content: `
        <ul><li>Baseline funnel rates, reason shares, and financial impact are assumptions.</li><li>Statements about hidden objections need validation in real conversations and coded loss data.</li><li>The personalized preview depends on credible outcome data and a defensible fit assessment.</li><li>Matched proof needs alumni consent and sufficient relevant supply.</li><li>Financing clarity needs accurate terms; easier payment must not conceal unaffordable borrowing.</li></ul>` },
      { id: 'next', title: 'Validate the reason before building the response.', content: `
        <p>Compare what lost learners say with the point where they stopped. Then test the smallest useful cost-clarity treatment with a concurrent control and pre-agreed guardrails.</p>
        <p>Read refund and course-engagement outcomes alongside conversion. If more learners pay but their fit or subsequent engagement worsens, the intervention has not met the case’s success criteria.</p>` },
    ],
  },
  'myntra-shopping-assistant': {
    discipline: 'Consumer shopping and personalization',
    boundary: 'An independent product concept, not affiliated with or endorsed by Myntra. Baselines, targets, effort, and sizing are illustrative assumptions.',
    sections: [
      { id: 'problem', title: 'A saved item should have a useful next step.', content: `
        <p>The case starts with three hypotheses: shoppers face too many similar choices, miss price changes, and use a wishlist that stores items without helping them decide. A personal shopping assistant could connect relevance, timing, and organization.</p>
        <p>The launch focus is wishlist creators and price-conscious buyers. Saved items already express intent, giving alerts and organization a focused place to begin.</p>
        ${note('Problem hypothesis', 'These shopper needs are the case-study premise. They require behavioral data and user validation before being treated as established findings about Myntra.')}` },
      { id: 'contribution', title: 'What this work produced', content: `
        <p>I scoped three connected surfaces, laid out recommendation, price-alert, and wishlist flows, and sequenced delivery with RICE. The work also defines experiment hypotheses and guardrails for margin, notification fatigue, returns, and time to decide.</p>
        <p>The proposal starts with useful alerts and organization, then adds deeper personalization after the first phase is evaluated.</p>` },
      { id: 'flows', title: 'One assistant, three connected moments.', content: `
        ${shoppingFigure()}
        <h3>1. Recommendations with a reason</h3><p>A compact “Picked for you” module offers a shortlist tied to browsing and saved-item signals. A short explanation helps the shopper understand a pick; “Not for me” gives them control.</p>
        <h3>2. Alerts chosen by the shopper</h3><p>Saving an item can prompt an optional alert. The shopper chooses any drop, a threshold, or a target price and a channel. The notification should show the price change and size availability, with a direct path back to the item.</p>
        <h3>3. A wishlist that helps organize a decision</h3><p>Suggested categories and user-created groups make saved items easier to revisit. “Complete the look” suggestions appear when a category is opened, rather than interrupting the shopper with more pushes.</p>
        <p>Alerts need frequency limits and an easy opt-out. Recommendations need explanations and dismissal controls. The source wireframes define structure and flow; the case does not claim a released assistant.</p>` },
      { id: 'scope', title: 'Earn trust with utility before expanding the assistant.', content: `
        ${table('Scope and trade-offs', ['Decision', 'Included', 'Reason'], [
          ['First release', 'Price alerts, wishlist categories, event tracking.', 'Support existing saved-item intent and establish a useful baseline.'],
          ['Next phase', 'Recommendations and look-completion suggestions.', 'Build on signals from saves, preferences, and categories.'],
          ['Later, conditional', 'Wishlist sharing and a style-guidance chatbot.', 'Higher or less certain effort; revisit after earlier phases show value.'],
          ['Outside this case', 'Cross-platform shopping, voice interactions, virtual try-on.', 'Separate integrations or investments beyond the core problem.'],
        ])}
        <p>The central trade-off is that price alerts can encourage waiting for discounts. A useful shopper feature can still harm the business if it erodes margin or creates too many notifications.</p>` },
      { id: 'prioritization', title: 'Alerts and organization come first.', content: `
        <p>RICE reach is an illustrative share of active users touched per quarter. Effort is in person-months.</p>
        ${table('Illustrative RICE inputs', ['Feature', 'Reach', 'Impact', 'Confidence', 'Effort', 'RICE'], [
          ['Price-drop alerts', '35', '2', '80%', '2', '28.0'],
          ['Wishlist categories', '35', '1', '90%', '1.5', '21.0'],
          ['Recommendations carousel', '90', '1', '60%', '4', '13.5'],
          ['Complete the look', '25', '2', '50%', '3', '8.3'],
          ['Wishlist sharing', '10', '1', '50%', '2', '2.5'],
          ['Style-guidance chatbot', '15', '2', '30%', '6', '1.5'],
        ])}
        <p>The proposed first phase combines alerts, categories, and instrumentation. Recommendations follow only after assessing wishlist-to-order movement, opt-outs, and margin. The assumption that existing ranking infrastructure can be reused requires engineering review.</p>` },
      { id: 'measurement', title: 'Make shopping easier without rewarding friction.', content: `
        <p><strong>Proposed north star:</strong> repeat customers within three months. The source sets a +25% relative target; it also proposes +20% session time, +15% wishlist adds, and +10% revenue from personalized recommendations. These are targets, not achieved outcomes.</p>
        ${note('Metric tension', 'Longer sessions can conflict with reducing decision fatigue. Treat session time as context and protect time to first add-to-bag, so more browsing is not automatically interpreted as better shopping.')}
        ${table('Proposed tests', ['Feature', 'Primary learning', 'Guardrails'], [
          ['Price alerts', 'Does an optional alert prompt increase wishlist-to-order conversion among savers?', 'Gross margin per order; notification opt-outs.'],
          ['Wishlist categories', 'Does organization increase return visits?', 'Wishlist load time.'],
          ['Recommendations', 'Do relevant, explained picks improve add-to-bag behavior?', 'Time to first add-to-bag; returns.'],
          ['Complete the look', 'Do useful pairings increase items per order?', 'Return rate.'],
        ])}
        <p>The source proposes user-level assignment, consistent treatment across sessions, and a holdout long enough to read the 90-day repeat outcome. Set one primary metric and a decision rule before each test.</p>` },
      { id: 'limitations', title: 'The inputs and the recommendation quality are assumptions.', content: `
        <ul><li>Current behavior, baseline performance, RICE inputs, and targets need real validation.</li><li>Product- and size-level price history must exist and be accurate.</li><li>Push opt-in rates may limit reach; an in-app option could be needed.</li><li>New shoppers need useful defaults while personalization signals develop.</li><li>Narrow recommendations can reduce discovery; monitor variety alongside relevance.</li><li>Controls, consent, and honest price/stock information are prerequisites for trust.</li></ul>` },
      { id: 'next', title: 'Test the first useful loop.', content: `
        <p>Audit saved-item behavior, price history, and notification permissions. Then test optional alerts and basic organization with a holdout, measuring whether saved items become purchases while margin and opt-outs stay healthy.</p>
        <p>Use that learning to decide whether richer recommendations solve a demonstrated problem and whether the extra complexity is justified.</p>` },
    ],
  },
};
