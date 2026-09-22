import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { navigate } from "../router";

/*
 * Covers the page on the way out and lifts it on the way in, so moving between
 * pages reads as one continuous move rather than a reload.
 *
 * It is one panel throughout, not an exit panel swapped for an entry panel:
 * the swap left a frame where neither was on screen and the incoming page
 * showed through. The route changes in the same commit that starts the lift,
 * so the panel is solid over the whole handover.
 */

const EASE = [0.77, 0, 0.175, 1];
const EXIT_MS = 420;
const ENTER_MS = 640;
const ENTER_DELAY_MS = 60;

export default function PageTransition({ skipEntry = false }) {
  const reduceMotion = useReducedMotion();
  // On the index page the opening loader does the reveal, so the entry curtain
  // would only repeat it.
  const [phase, setPhase] = useState(skipEntry ? "idle" : "enter");
  const timer = useRef(0);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;

      const url = new URL(link.getAttribute("href"), window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.href === window.location.href) return;

      event.preventDefault();
      setPhase("exit");

      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        // Batched into one render: the new page mounts under a panel that is
        // already down, and only then does the panel start lifting.
        navigate(url.href);
        setPhase("enter");
      }, EXIT_MS);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      window.clearTimeout(timer.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    // Back and forward swap the page with no curtain to hide behind.
    const clear = () => setPhase("idle");
    // A restore from the back/forward cache must not leave the page covered.
    // Plain pageshow also fires on a first load, where clearing would cut the
    // entry lift off halfway.
    const handleShow = (event) => {
      if (event.persisted) setPhase("idle");
    };

    window.addEventListener("popstate", clear);
    window.addEventListener("pageshow", handleShow);
    return () => {
      window.removeEventListener("popstate", clear);
      window.removeEventListener("pageshow", handleShow);
    };
  }, []);

  if (reduceMotion) return null;

  const covering = phase === "exit";

  return (
    <motion.div
      className="curtain"
      aria-hidden="true"
      initial={{ scaleY: phase === "enter" ? 1 : 0 }}
      animate={{ scaleY: covering ? 1 : 0 }}
      style={{ transformOrigin: covering ? "bottom" : "top" }}
      transition={{
        duration: (covering ? EXIT_MS : ENTER_MS) / 1000,
        ease: EASE,
        delay: covering ? 0 : ENTER_DELAY_MS / 1000,
      }}
    />
  );
}
