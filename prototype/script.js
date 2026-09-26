const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(name, focus = false) {
  tabs.forEach(tab => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  panels.forEach(panel => {
    const active = panel.id === `panel-${name}`;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activateTab(tabs[next].dataset.tab, true);
    }
  });
});

const riderContent = document.getElementById('rider-content');
let riderState = 'matched';
const riderViews = {
  matched: `
    <div class="status-line"><span class="status-dot"></span> DRIVER MATCHED</div>
    <h3>Your driver is on the way</h3>
    <p class="phone-subcopy">Pickup estimate: about 5 min <span class="scenario-tag">Example</span></p>
    <div class="driver-card"><div class="avatar">AM</div><div><strong>Alex M.</strong><small>Silver sedan · XY 4821</small></div><span class="rating">★ 4.9</span></div>
    <div class="trip-route"><div><span class="route-bullet start"></span><span>Pickup</span><strong>Market Street</strong></div><div><span class="route-bullet end"></span><span>Drop-off</span><strong>Central Station</strong></div></div>
    <button class="primary-button" data-rider-next="cancelled">Simulate driver cancellation <span aria-hidden="true">→</span></button>`,
  cancelled: `
    <div class="status-line amber"><span class="status-dot"></span> TRIP UPDATE</div>
    <h3>Your driver cancelled</h3>
    <p class="phone-subcopy">We know this interrupts your trip. Your request is still active, and we can look for another driver.</p>
    <div class="notice-card"><strong>What happens next?</strong><span>We’ll move your request into priority rematching. No need to start over.</span></div>
    <button class="primary-button" data-rider-next="rematching">Find me a new driver <span aria-hidden="true">→</span></button>
    <button class="text-button" data-rider-next="matched">Restart demo</button>`,
  rematching: `
    <div class="status-line teal"><span class="status-dot pulse"></span> PRIORITY REMATCH ACTIVE</div>
    <h3>Finding you a new driver</h3>
    <p class="phone-subcopy">Your request is being prioritized in the next matching pass.</p>
    <div class="priority-card"><div class="priority-icon">↗</div><div><strong>Priority matching</strong><span>Looking for an available driver nearby</span></div></div>
    <div class="eta-card"><span>ESTIMATED TIME TO A NEW MATCH</span><strong>3–6 min <small>illustrative range</small></strong><p>This range may change with nearby driver availability.</p></div>
    <div class="progress-line"><i></i></div>
    <button class="primary-button" data-rider-next="recovered">Simulate a new match <span aria-hidden="true">→</span></button>`,
  recovered: `
    <div class="status-line teal"><span class="status-dot"></span> NEW DRIVER MATCHED</div>
    <h3>You’re back on your way</h3>
    <p class="phone-subcopy">Thanks for waiting. Your new driver is heading to the pickup.</p>
    <div class="driver-card"><div class="avatar alt">JD</div><div><strong>Jordan D.</strong><small>Blue hatchback · QZ 7318</small></div><span class="rating">★ 4.8</span></div>
    <div class="notice-card success"><strong>Request preserved</strong><span>Your pickup and destination stayed the same through rematching.</span></div>
    <button class="primary-button" data-rider-next="matched">Replay rider flow <span aria-hidden="true">↺</span></button>`
};

function renderRider() {
  const restoreFocus = riderContent.contains(document.activeElement);
  riderContent.innerHTML = riderViews[riderState];
  if (restoreFocus) focusState(riderContent);
  document.querySelectorAll('#rider-steps li').forEach(step => {
    step.classList.toggle('current', step.dataset.step === riderState);
  });
}

riderContent.addEventListener('click', event => {
  const button = event.target.closest('[data-rider-next]');
  if (!button) return;
  riderState = button.dataset.riderNext;
  renderRider();
});

const driverContent = document.getElementById('driver-content');
let driverState = 'incoming';
let selectedReason = '';
const reasonDetails = {
  fare: { label: 'Low fare', title: 'A fare floor applies', body: 'This example trip has a guaranteed minimum payout of ₹180. Estimated earnings already include the floor; check the amount before deciding.' },
  direction: { label: 'Wrong direction', title: 'Check your route fit', body: 'This example drop-off is near your declared destination. If your plans have changed, you can still cancel.' },
  traffic: { label: 'Traffic / pickup ETA', title: 'Pickup context updated', body: 'Current traffic may extend the pickup. Review the updated 6–9 min estimate before deciding.' },
  other: { label: 'Other', title: 'Confirm your choice', body: 'If this trip no longer works for you, you can continue with cancellation. No additional reason is required.' }
};

function renderDriver() {
  const restoreFocus = driverContent.contains(document.activeElement);
  if (driverState === 'incoming') {
    driverContent.innerHTML = `
      <div class="status-line teal"><span class="status-dot"></span> INCOMING REQUEST</div>
      <h3>New trip nearby</h3><p class="phone-subcopy">Illustrative trip and payout details</p>
      <div class="earnings"><span>ESTIMATED EARNINGS</span><strong>₹180</strong><small>Includes an illustrative ₹180 fare-floor guarantee</small></div>
      <div class="trip-facts"><div><span>Trip fare</span><strong>₹160 · illustrative</strong></div><div><span>Pickup</span><strong>Market Street · 1.2 km away</strong></div><div><span>Trip distance</span><strong>4.8 km</strong></div><div><span>Pickup ETA</span><strong>6–9 min</strong></div><div><span>Direction</span><strong>Toward Central Station</strong></div></div>
      <button class="primary-button" data-driver-action="reason">I may need to cancel <span aria-hidden="true">→</span></button>`;
  } else if (driverState === 'reason') {
    driverContent.innerHTML = `
      <div class="status-line amber"><span class="status-dot"></span> CANCELLATION REASON</div>
      <h3>What changed?</h3><p class="phone-subcopy">Choose the closest reason. This helps us respond with relevant trip details.</p>
      <div class="reason-options">${Object.entries(reasonDetails).map(([key, value]) => `<button type="button" data-reason="${key}" aria-pressed="${selectedReason === key}">${value.label}<span aria-hidden="true">↗</span></button>`).join('')}</div>
      <button class="text-button" data-driver-action="incoming">Back to trip</button>`;
  } else if (driverState === 'nudge') {
    const detail = reasonDetails[selectedReason];
    driverContent.innerHTML = `
      <div class="status-line teal"><span class="status-dot"></span> TRIP CONTEXT</div>
      <span class="selected-reason">YOUR REASON · ${detail.label.toUpperCase()}</span>
      <h3>${detail.title}</h3><p class="phone-subcopy">${detail.body}</p>
      <div class="notice-card"><strong>Your choice stays yours</strong><span>Review this context, then keep the trip or confirm cancellation.</span></div>
      <button class="primary-button" data-driver-action="kept">Keep this trip <span aria-hidden="true">→</span></button>
      <button class="text-button danger-text" data-driver-action="cancelled">Confirm cancellation</button>
      <button class="text-button" data-driver-action="reason">Change reason</button>`;
  } else {
    const kept = driverState === 'kept';
    driverContent.innerHTML = `
      <div class="status-line ${kept ? 'teal' : 'amber'}"><span class="status-dot"></span> ${kept ? 'TRIP KEPT' : 'CANCELLATION CONFIRMED'}</div>
      <h3>${kept ? 'Trip stays on track' : 'Trip cancelled'}</h3>
      <p class="phone-subcopy">${kept ? 'The driver continues with the trip after reviewing the context.' : 'The rider moves to priority rematching. The driver is free to consider another request.'}</p>
      <div class="notice-card ${kept ? 'success' : ''}"><strong>${kept ? 'Decision recorded' : 'Recovery triggered'}</strong><span>${kept ? 'In a real pilot, compare this outcome with a control group.' : 'In a real pilot, track whether the rider encounters another cancellation.'}</span></div>
      <button class="primary-button" data-driver-action="incoming">Replay driver flow <span aria-hidden="true">↺</span></button>`;
  }
  if (restoreFocus) focusState(driverContent);
}

function focusState(container) {
  const heading = container.querySelector('h3');
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}

driverContent.addEventListener('click', event => {
  const reason = event.target.closest('[data-reason]');
  if (reason) {
    selectedReason = reason.dataset.reason;
    driverState = 'nudge';
    renderDriver();
    return;
  }
  const action = event.target.closest('[data-driver-action]');
  if (!action) return;
  driverState = action.dataset.driverAction;
  if (driverState === 'incoming') selectedReason = '';
  renderDriver();
});

renderRider();
renderDriver();
