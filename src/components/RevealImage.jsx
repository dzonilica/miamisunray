import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SIZES, imageSources } from "../media";
import { useIsNarrow } from "../hooks";

/*
 * Figure that drifts on scroll. Nothing else.
 *
 * There is deliberately no entrance animation: the picture is simply there,
 * fully painted, from the moment it is in the document. The only movement is the
 * parallax — the image sits in an oversized track inside an overflow-hidden
 * figure and slides against the page as it scrolls past.
 *
 * Every photograph ships AVIF and WebP width variants, so the picture carries a
 * srcset and a sizes hint: a phone pulls the 480px file, not the 1440px one. The
 * original JPEG stays as the fallback src.
 */

export default function RevealImage({
  src,
  alt,
  className = "",
  ratio,
  parallax = 86,
  sizes = SIZES.content,
  objectPosition = "center",
  priority = false,
}) {
  const hostRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  // A phone paints the whole drift every frame for a fraction of the effect.
  const travel = narrow ? Math.round(parallax * 0.34) : parallax;

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel]);

  const frameStyle = ratio ? { aspectRatio: ratio } : undefined;
  const sources = imageSources(src);

  const picture = (
    <picture>
      {sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        src={src}
        alt={alt}
        sizes={sources.length ? sizes : undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ objectPosition }}
      />
    </picture>
  );

  if (reduceMotion) {
    return (
      <figure ref={hostRef} className={`figure ${className}`.trim()} style={frameStyle}>
        {picture}
      </figure>
    );
  }

  return (
    <figure ref={hostRef} className={`figure ${className}`.trim()} style={frameStyle}>
      <motion.div
        className="figure__shift"
        style={{ y, height: `calc(100% + ${travel * 2}px)`, marginTop: -travel }}
      >
        {picture}
      </motion.div>
    </figure>
  );
}
