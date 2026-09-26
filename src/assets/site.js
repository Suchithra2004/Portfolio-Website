const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const mobile = window.matchMedia('(max-width: 767px)');

if (header && menu && nav) {
  header.classList.add('is-enhanced');
  menu.hidden = false;

  function closeMenu(returnFocus = false) {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.querySelector('span').textContent = '+';
    if (returnFocus) menu.focus();
  }

  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('span').textContent = open ? '−' : '+';
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    closeMenu();
    if (link.getAttribute('href').startsWith('#')) {
      const target = document.getElementById(link.hash.slice(1));
      target?.focus({ preventScroll: true });
    }
  });

  mobile.addEventListener('change', () => closeMenu());

  const sections = [...document.querySelectorAll('main > section[id]')];
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        nav.querySelectorAll('a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-15% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
}

// Content stays visible without JavaScript. Animate each section once on entry.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let entranceObserver;
const motionTargets = document.querySelectorAll('.project, .about-copy, .thinking-row, .experience-entry, .reader-section .project-figure');
const seenTargets = new WeakSet();

function setupEntrances() {
  entranceObserver?.disconnect();
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  entranceObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || seenTargets.has(entry.target)) continue;
      const target = entry.target;
      seenTargets.add(target);
      entranceObserver.unobserve(target);
      // A keyboard destination should never move while its link is focused.
      if (target.contains(document.activeElement)) continue;
      target.animate([{ opacity: .2, translate: '0 18px' }, { opacity: 1, translate: '0 0' }], {
        duration: 560, easing: 'cubic-bezier(.2,.7,.2,1)',
      });
      target.querySelectorAll('.step-node, .matrix-row, .shopping-steps > li').forEach((step, index) => {
        step.animate([{ opacity: .3, translate: '0 5px' }, { opacity: 1, translate: '0 0' }], {
          duration: 420, delay: 100 + index * 90, easing: 'ease-out',
        });
      });
      target.querySelectorAll('.funnel-bar').forEach(bar => {
        bar.animate([{ transform: 'scaleX(0)', transformOrigin: 'left' }, { transform: 'scaleX(1)', transformOrigin: 'left' }], {
          duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)',
        });
      });
    }
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  motionTargets.forEach(target => { if (!seenTargets.has(target)) entranceObserver.observe(target); });
}

let progressFrame = 0;
function updateReadingProgress() {
  progressFrame = 0;
  if (!header || reducedMotion.matches) return;
  const available = document.documentElement.scrollHeight - innerHeight;
  header.style.setProperty('--reading-progress', available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0);
}
function queueProgress() {
  if (!progressFrame && !reducedMotion.matches) progressFrame = requestAnimationFrame(updateReadingProgress);
}
addEventListener('scroll', queueProgress, { passive: true });
addEventListener('resize', queueProgress, { passive: true });
document.fonts.ready.then(queueProgress);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
  setupEntrances();
  queueProgress();
});
document.addEventListener('focusin', event => {
  const target = event.target.closest('.project, .thinking-row, .experience-entry, .reader-section .project-figure');
  target?.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
});
setupEntrances();
queueProgress();
