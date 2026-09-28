// Static, low-fidelity product concepts adapted from the supplied report.
// These are figures, not working payment controls.
const action = label => `<span class="payment-ui-action">${label}</span>`;
const amount = '<strong class="payment-amount">₹1,249</strong><span class="payment-payee">to Cafe Aroma</span>';

export function processingPhone() {
  return `<div class="payment-phone payment-current"><span class="small-label">Paying Cafe Aroma</span>${amount}<span class="payment-spinner" aria-hidden="true"></span><strong>Processing…</strong><p>Please wait. Do not press back.</p><div class="payment-missing">No status<br>No time estimate<br>No next step</div></div>`;
}

export function paymentFigure() {
  return `<figure class="project-figure payment-figure"><div class="figure-heading"><span class="eyebrow">When the spinner has no answer</span><span class="figure-index">05 / TRUST</span></div><div class="payment-figure-body">${processingPhone()}<div class="payment-figure-insight"><span class="small-label">The product question</span><p>Did it <br>go through?</p><span>Say what is known.<br>Give a safe next step.<br>Close the loop.</span></div></div><figcaption>Hypothesised current experience · recreated from the case study</figcaption></figure>`;
}

export function paymentHero() {
  return `<div class="payment-hero-visual">${paymentFigure()}<div class="payment-hero-note"><span class="eyebrow">The moment that matters</span><p>Money debited.<br>Merchant waiting.<br><em>No clear answer.</em></p><span class="caption">A proposed response to uncertainty, from the first message to the final outcome.</span></div></div>`;
}

export function systemFigure() {
  const layers = [
    ['User / device / network', 'Connectivity drops or the app is backgrounded.', 'Idempotent request IDs, safe resume, clear offline messaging.', 'Partial control'],
    ['Our app (TPAP)', 'Timeouts and unclear state handling.', 'Improve the timeout/state machine; instrument every transition.', 'Direct control'],
    ['Partner PSP bank', 'Slow responses or downtime.', 'Track partner health, escalate with data, route where possible.', 'Partner'],
    ['NPCI UPI switch', 'Load spikes and timeouts.', 'Respect API limits; prefer callbacks to repeated polling.', 'Ecosystem'],
    ['Remitter bank', 'Delays debiting or answering.', 'Show bank health and suggest another linked account.', 'Bank'],
    ['Beneficiary bank / merchant', 'Delayed confirmation or deemed status.', 'Explain the state honestly; offer verifiable payment-status proof.', 'Bank / merchant'],
  ];
  return `<figure class="payment-system"><ol aria-label="Six layers of a payment">${layers.map(([name, failure, response, control], i) => `<li><span class="payment-layer-number" aria-hidden="true">${i + 1}</span><div><strong>${name}</strong><span class="small-label">${control}</span><p>${failure}</p><p>${response}</p></div></li>`).join('')}</ol><figcaption>The app can design device-side handling and its own states. Bank and network infrastructure remain external dependencies.</figcaption></figure>`;
}

export function stateFigure() {
  return `<figure class="project-figure payment-state"><ol class="payment-state-entry" aria-label="Payment begins"><li>Payment initiated</li><li>PIN verified</li><li>Processing<span>Request in flight</span></li></ol><span class="payment-state-arrow" aria-hidden="true">↓</span><div class="payment-state-branches"><div class="payment-state-node"><strong>Success</strong><span>Merchant confirmed</span></div><div class="payment-state-node"><strong>Failed</strong><span>Clear reason shown</span></div><div class="payment-state-node payment-state-pending"><strong>Pending / deemed</strong><span>No final answer yet</span><span class="payment-state-arrow" aria-hidden="true">↓</span><div>Confirmed later</div><span class="small-label">or</span><div>Failed and auto-reversed<span>T+1 to T+5*</span></div></div></div><figcaption>*Report’s illustrative reversal window; timing depends on the payment type. Confirm current rules and partner status before showing a date.</figcaption></figure>`;
}

export function wireframes() {
  const concepts = [
    ['01 / Current experience', processingPhone(), 'Hypothesised today: the user has no information to act on.'],
    ['02 / Proposed pending', `<div class="payment-phone"><span class="small-label">Payment status</span>${amount}<strong class="payment-status">Pending with bank</strong><ol class="payment-ui-track"><li>Request sent<span>4:12 pm</span></li><li>Waiting for bank<span>Usually 2–5 minutes</span></li><li class="payment-unconfirmed">Merchant confirmation awaited</li></ol><p class="payment-ui-note">Your money is safe.<br>If this fails, it returns to you automatically.</p><strong class="payment-ui-warning">Please don’t pay again yet.</strong>${action('Share proof with merchant')}${action('Get help')}</div>`, 'Source concept copy: reassurance and estimates require validation against the actual state.'],
    ['03 / Failure & refund', `<div class="payment-phone"><span class="small-label">Payment status</span>${amount}<strong class="payment-status">Failed · refund on the way</strong><ol class="payment-ui-track"><li>Debited from account<span>4:12 pm</span></li><li>Reversal started by bank<span>4:20 pm</span></li><li>Expected back by<span>Tomorrow, 6 pm (example)</span></li></ol><p class="payment-ui-note">If it’s late, we raise a dispute for you automatically.</p>${action('Track refund')}${action('Pay again')}</div>`, 'Show the reversal timeline; resolve the blocked credit limit too.'],
    ['04 / Duplicate guard', `<div class="payment-phone"><span class="small-label">Pay Cafe Aroma</span>${amount}<div class="payment-ui-note"><strong>A similar payment is pending</strong><p>You paid ₹1,249 to Cafe Aroma 3 min ago. It is still being confirmed.</p></div><span class="payment-status">Pending with bank</span>${action('Check status')}${action('Pay anyway')}</div>`, 'Warn on the same payee and amount within ten minutes; preserve user choice.'],
    ['05 / Preflight warning', `<div class="payment-phone"><span class="small-label">Pay Cafe Aroma</span>${amount}<div class="payment-ui-note"><strong>This bank is slow right now.</strong><p>Your payment may take longer to confirm.</p></div><span class="small-label">Pay from</span><div class="payment-account">HDFC ••4021<span>Slow now · not selected</span></div><div class="payment-account payment-account-selected">Axis ••8812<span>Working normally · selected</span></div>${action('Pay ₹1,249')}</div>`, 'Offer another account. Never switch the source of funds silently.'],
    ['06 / Merchant proof', `<div class="payment-phone"><span class="small-label">Payment proof</span><strong class="payment-status">Pending · verify with us</strong>${amount}<dl class="payment-proof"><dt>Time</dt><dd>4:12 pm, 24 Sep</dd><dt>UPI ref</dt><dd>4128 •••• 3391</dd></dl><div class="payment-verify">Merchant verification link<br><small>Expires · concept placeholder</small></div><p>Pending status does not confirm receipt of funds.</p>${action('Share proof')}</div>`, 'A verifiable status receipt with minimal fields and an expiring link.'],
  ];
  return `<div class="payment-wireframes">${concepts.map(([label, ui, caption]) => `<figure><h3>${label}</h3>${ui}<figcaption>${caption}</figcaption></figure>`).join('')}</div>`;
}
