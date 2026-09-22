import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import BrandMark from "./BrandMark";
import { markIntroDone } from "../intro";

/*
 * Opening loader for the index page. The count follows real readiness — fonts,
 * the hero frame, the rest of the document — and the panel then lifts the same
 * way the page curtain does, so arriving reads as one continuous move.
 */

const EASE_OUT = [0.165, 0.84, 0.44, 1];
const EASE_IN_OUT = [0.77, 0, 0.175, 1];

const MIN_MS = 1000; // any shorter and the loader only flickers
const MAX_MS = 4000; // any longer and a slow asset is holding the page hostage
const HOLD_MS = 240; // the content clears before the panel moves
const WIPE_S = 0.78;

function whenLoaded() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
}

function whenDecoded(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

export default function Loader() {
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(false);

  const progress = useMotionValue(0);
  const fill = useTransform(progress, [0, 100], [0, 1]);
  const readout = useTransform(progress, (value) => String(Math.round(value)).padStart(3, "0"));

  useEffect(() => {
    let live = true;
    const startedAt = performance.now();

    // The sweep covers the wait; the real signals decide where it lands.
    const sweep = animate(progress, 88, { duration: 1.5, ease: EASE_OUT });

    const settle = () => {
      if (!live) return;
      sweep.stop();
      animate(progress, 100, {
        duration: 0.36,
        ease: "easeOut",
        onComplete: () => {
          if (live) setClosing(true);
        },
      });
    };

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      whenDecoded("/media/hero-poster.jpg"),
      whenLoaded(),
    ]);
    const cap = new Promise((resolve) => {
      window.setTimeout(resolve, MAX_MS);
    });

    Promise.race([ready, cap]).then(() => {
      if (!live) return;
      window.setTimeout(settle, Math.max(0, MIN_MS - (performance.now() - startedAt)));
    });

    return () => {
      live = false;
      sweep.stop();
    };
  }, [progress]);

  // The hero starts moving as the panel lifts, not after it has gone.
  useEffect(() => {
    if (!closing) return undefined;
    const id = window.setTimeout(markIntroDone, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [closing]);

  if (gone) return null;

  return (
    <div className="loader" aria-hidden="true">
      <motion.div
        className="loader__panel"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: closing ? 0 : 1 }}
        transition={{
          duration: WIPE_S,
          ease: EASE_IN_OUT,
          delay: closing ? HOLD_MS / 1000 : 0,
        }}
        onAnimationComplete={() => {
          if (closing) setGone(true);
        }}
      />

      <motion.div
        className="loader__inner"
        animate={closing ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <span className="loader__wordmark">
          <motion.span
            className="loader__wordmark-run"
            initial={{ y: "118%" }}
            animate={{ y: closing ? "-118%" : 0 }}
            transition={{
              duration: closing ? 0.46 : 1.05,
              ease: closing ? EASE_IN_OUT : EASE_OUT,
              delay: closing ? 0 : 0.1,
            }}
          >
            <BrandMark variant="light" />
          </motion.span>
        </span>

        <span className="loader__meta">
          <span className="loader__label">
            <span className="loader__diamond" />
            Miami &middot; South Florida
          </span>
          <motion.span className="loader__count">{readout}</motion.span>
        </span>

        <span className="loader__rail">
          <motion.span className="loader__fill" style={{ scaleX: fill }} />
        </span>
      </motion.div>
    </div>
  );
}
