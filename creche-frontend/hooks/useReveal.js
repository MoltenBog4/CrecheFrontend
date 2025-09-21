import { useEffect } from 'react';

/**
 * useReveal
 * - Adds .reveal-in to [data-reveal] when entering viewport
 * - If the element has data-replay, we remove .reveal-in only
 *   after it is FULLY outside the viewport (with a small buffer),
 *   so it animates again when you scroll back.
 * - Supports child staggering with data-stagger="80"
 */
export default function useReveal(selector = '[data-reveal]', options = {}) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    const {
      threshold = 0.15,
      rootMargin = '0px 0px -10%', // start a bit before bottom
    } = options;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const wantsReplay = el.hasAttribute('data-replay');

          if (entry.isIntersecting) {
            el.classList.add('reveal-in');

            // optional child stagger
            const s = parseInt(el.getAttribute('data-stagger') || '0', 10);
            if (s > 0) {
              Array.from(el.children).forEach((child, i) => {
                child.style.transitionDelay = `${i * s}ms`;
                child.style.willChange = 'opacity, transform, filter';
              });
            }
            return;
          }

          // Not intersecting: only reset if element is FULLY out of view
          if (wantsReplay) {
            const buffer = 40; // px
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const rect = el.getBoundingClientRect();
            const fullyAbove = rect.bottom < -buffer;
            const fullyBelow = rect.top > vh + buffer;

            if (fullyAbove || fullyBelow) {
              el.classList.remove('reveal-in');
              // clear prior stagger delays so it recalculates cleanly next time
              Array.from(el.children).forEach((child) => (child.style.transitionDelay = ''));
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector, options.threshold, options.rootMargin]);
}
