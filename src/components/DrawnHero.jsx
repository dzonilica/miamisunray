import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Eyebrow from "./Eyebrow";
import SplitText from "./SplitText";
import { imageSources } from "../media";
import { useIsNarrow } from "../hooks";

/*
 * Hero that builds the house while you scroll.
 *
 * Two pictures of the same address share one box: a line drawing of it, and a
 * photograph of it finished. The drawing is the resting state and is always
 * painted. The photograph rides in a curtain above it that sits below the
 * frame at rest and climbs back into it as the page scrolls, so the drawing
 * turns into the building from the ground up.
 *
 * The curtain is two counter-running translates rather than an animated
 * clip-path: the outer box moves down by the same share of the frame that the
 * inner box moves up, which leaves the photograph standing still against the
 * drawing underneath while only the cut line travels. Both are plain
 * transforms, so the reveal stays on the compositor for its whole run.
 *
 * The pair in public/media/approach is baked to one frame and one intrinsic
 * size, and both layers are laid out into the identical box, so object-fit
 * crops them the same way at every viewport and the two houses stay
 * registered however the frame is shaped.
 */

const EASE = [0.165, 0.84, 0.44, 1];

/* The cut finishes before the scrub does, so the photograph gets a stretch of
   scroll as itself rather than arriving exactly as the section leaves. */
const DONE = 0.8;

/*
 * Where the frame sits in the viewport with the page at rest, which is the
 * height of the copy above it. Starting the scrub exactly there is what opens
 * the drawing with no photograph in it at all: a scrub that started any higher
 * would have the cut already part way up before the first scroll.
 *
 * These are the two .drawn-hero__copy min-heights from the stylesheet, and
 * have to stay in step with them.
 */
const OFFSET = {
  wide: ["start 0.78", "end 0.45"],
  narrow: ["start 0.72", "end 0.45"],
};

function Layer({ src, priority = false }) {
  const sources = imageSources(src);

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes="100vw" />
      ))}
      <img
        className="drawn-hero__layer"
        src={src}
        alt=""
        sizes={sources.length ? "100vw" : undefined}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}

export default function DrawnHero({ eyebrow, title, lead, drawn, built, alt }) {
  const artRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  const { scrollYProgress } = useScroll({
    target: artRef,
    // The cut runs out by the time the frame is sitting mid-screen.
    offset: narrow ? OFFSET.narrow : OFFSET.wide,
  });

  const curtain = useTransform(scrollYProgress, [0, DONE], ["100%", "0%"]);
  const counter = useTransform(scrollYProgress, [0, DONE], ["-100%", "0%"]);

  return (
    <section className="drawn-hero" aria-labelledby="page-title">
      <div className="drawn-hero__copy shell">
        {eyebrow && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
        )}

        <SplitText
          as="h1"
          id="page-title"
          className="drawn-hero__title"
          text={title}
          trigger="mount"
          delay={0.38}
          stagger={0.085}
          duration={1.15}
        />

        {lead && (
          <motion.p
            className="drawn-hero__lead"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          >
            {lead}
          </motion.p>
        )}

        {!reduceMotion && (
          <motion.span
            className="drawn-hero__cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          >
            Scroll to build
            <span className="drawn-hero__cue-rail" aria-hidden="true">
              <span className="drawn-hero__cue-dot" />
            </span>
          </motion.span>
        )}
      </div>

      <figure ref={artRef} className="drawn-hero__art" role="img" aria-label={alt}>
        <Layer src={drawn} priority />

        {/* Reduced motion gets the finished house outright: it is the more
            useful of the two states, and there is no scrub to earn it. */}
        {reduceMotion ? (
          <div className="drawn-hero__curtain">
            <div className="drawn-hero__curtain-inner">
              <Layer src={built} />
            </div>
          </div>
        ) : (
          <motion.div className="drawn-hero__curtain" style={{ y: curtain }}>
            <motion.div className="drawn-hero__curtain-inner" style={{ y: counter }}>
              <Layer src={built} />
            </motion.div>
          </motion.div>
        )}
      </figure>
    </section>
  );
}
