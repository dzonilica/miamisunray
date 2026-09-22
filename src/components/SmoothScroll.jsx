import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { setScroller } from "../scroll";

/*
 * Damped wheel scrolling. Touch devices keep their native inertia, and anyone
 * who asked for reduced motion keeps the plain scroller.
 */
export default function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    // Route changes reset the scroll through this instance; going round it
    // leaves Lenis aiming at the previous page's offset.
    setScroller(lenis);

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Keep in-page anchors on the same easing instead of jumping past it.
    const OFFSET = 96;

    // A section that reserves its own clearance — one sitting under a sticky
    // index, say — has it declared as scroll-margin-top. Honour that over the
    // house offset, so the target does not land behind the thing that is
    // pinned above it.
    const clearance = (target) => {
      const declared = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop);
      return Number.isFinite(declared) && declared > 0 ? declared : OFFSET;
    };

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const offset = clearance(target);
      lenis.scrollTo(target, {
        offset: -offset,
        // Late-loading media or a competing scroll can leave the run short;
        // settle the last few pixels once the animation is done.
        onComplete: () => {
          const drift = target.getBoundingClientRect().top - offset;
          if (Math.abs(drift) > 4) {
            lenis.scrollTo(target, { offset: -offset, immediate: true });
          }
        },
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleClick);
      setScroller(null);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
