/*
 * Scroll control shared with Lenis.
 *
 * Lenis keeps its own target position, so a plain window.scrollTo() leaves it
 * pointing at where the previous page was and the next wheel tick snaps back.
 * Route changes go through here instead, and fall back to the native scroller
 * on touch, reduced motion, or anywhere Lenis is not running.
 */

let scroller = null;

export function setScroller(instance) {
  scroller = instance;
}

export function scrollToTop() {
  if (scroller) {
    scroller.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo(0, 0);
}

/*
 * Freeze the page under an overlay.
 *
 * body overflow alone does not hold when Lenis is driving the scroll — it keeps
 * its own target and carries on — so the instance is stopped as well, and the
 * scrollbar's width is handed back as padding so the layout does not jump.
 */
let lockDepth = 0;
let previousOverflow = "";
let previousPad = "";

export function lockScroll() {
  lockDepth += 1;
  if (lockDepth > 1) return;

  const gap = window.innerWidth - document.documentElement.clientWidth;
  previousOverflow = document.body.style.overflow;
  previousPad = document.body.style.paddingRight;

  document.body.style.overflow = "hidden";
  if (gap > 0) document.body.style.paddingRight = `${gap}px`;
  scroller?.stop?.();
}

export function unlockScroll() {
  if (!lockDepth) return;
  lockDepth -= 1;
  if (lockDepth) return;

  document.body.style.overflow = previousOverflow;
  document.body.style.paddingRight = previousPad;
  scroller?.start?.();
}

export function scrollToId(id, offset = 96) {
  const target = document.getElementById(id);
  if (!target) return false;

  if (scroller) {
    scroller.scrollTo(target, { offset: -offset, immediate: true, force: true });
    return true;
  }

  target.scrollIntoView({ behavior: "auto", block: "start" });
  return true;
}
