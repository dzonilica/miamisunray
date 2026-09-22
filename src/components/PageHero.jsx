import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Eyebrow from "./Eyebrow";
import RollText from "./RollText";
import SplitText from "./SplitText";
import { imageSources } from "../media";
import { useIsNarrow } from "../hooks";

const EASE = [0.165, 0.84, 0.44, 1];

/*
 * `bright` is for photographs that are pale through the middle, where the veil
 * written for ordinary imagery leaves the white type standing on near-white
 * pixels. It deepens the flat layer rather than the edge gradients, because the
 * middle band is where the title sits and where those gradients have run out.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  alt,
  cta,
  compact = false,
  bright = false,
}) {
  const hostRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start start", "end start"],
  });
  // Lighter on a phone: the same move costs a full-screen repaint there.
  const scale = useTransform(scrollYProgress, [0, 1], [1, narrow ? 1.1 : 1.26]);
  const shift = useTransform(scrollYProgress, [0, 1], ["0%", narrow ? "10%" : "22%"]);

  const sources = imageSources(image);

  return (
    <section
      ref={hostRef}
      className={`hero ${compact ? "hero--compact" : ""} ${bright ? "hero--bright" : ""}`
        .replace(/\s+/g, " ")
        .trim()}
      aria-labelledby="page-title"
    >
      <div className="hero__frame">
        <motion.div
          className="hero__frame-inner"
          style={reduceMotion ? undefined : { scale, y: shift }}
        >
          <picture>
            {sources.map((source) => (
              <source key={source.type} type={source.type} srcSet={source.srcSet} sizes="100vw" />
            ))}
            <img
              className="hero__image"
              src={image}
              alt={alt}
              sizes={sources.length ? "100vw" : undefined}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </motion.div>
      </div>
      <span className="hero__veil" aria-hidden="true" />

      <div className="hero__content shell">
        {eyebrow && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </motion.div>
        )}

        <SplitText
          as="h1"
          id="page-title"
          className="hero__title"
          text={title}
          trigger="mount"
          delay={0.42}
          stagger={0.085}
          duration={1.15}
        />

        {lead && (
          <motion.p
            className="hero__lead"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
          >
            {lead}
          </motion.p>
        )}

        {cta && (
          <motion.div
            className="hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.82, ease: EASE }}
          >
            <a className="btn btn--fill" href={cta.href}>
              <span className="btn__glyph" aria-hidden="true">
                &#8618;
              </span>
              <RollText>{cta.label}</RollText>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
