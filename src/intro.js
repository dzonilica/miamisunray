import { useEffect, useState } from "react";

/*
 * Opening loader state.
 *
 * The loader belongs to the index page alone: a fresh hit on "/", motion
 * allowed, once per tab. Anything that has to wait for it — the hero type, the
 * page curtain — reads this module instead of guessing at the timing.
 */

const SESSION_KEY = "sunray:intro-played";

function onIndex() {
  return window.location.pathname.replace(/\/+$/, "") === "";
}

function playedThisSession() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function wantsReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

export const introPlays = onIndex() && !playedThisSession() && !wantsReducedMotion();

// Set before the first paint so the index page opens on the loader ground
// rather than a flash of paper, and nothing scrolls underneath it.
if (introPlays) {
  document.documentElement.classList.add("is-intro");
}

let done = !introPlays;
const listeners = new Set();

export function markIntroDone() {
  if (done) return;
  done = true;
  document.documentElement.classList.remove("is-intro");

  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // A private window can refuse the write; the loader simply plays again.
  }

  listeners.forEach((listener) => listener());
  listeners.clear();
}

/* True once the page is free to animate in — immediately on every page that
   does not run the loader. */
export function useIntroDone() {
  const [ready, setReady] = useState(done);

  useEffect(() => {
    if (done) {
      setReady(true);
      return undefined;
    }

    const listener = () => setReady(true);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return ready;
}
