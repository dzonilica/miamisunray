import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import RevealImage from "./RevealImage";

/*
 * Two states of the same job, side by side. The frames drift against each other
 * on scroll so the pair reads as one moving unit rather than two static photos.
 */
export default function BeforeAfter({ before, after, beforeAlt, afterAlt, ratio = "3 / 4" }) {
  const hostRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start end", "end start"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], [58, -58]);

  return (
    <div className="ba" ref={hostRef}>
      <figure className="ba__panel">
        <RevealImage src={before} alt={beforeAlt} ratio={ratio} parallax={38} />
        <figcaption>
          <span className="ba__tag">Before</span>
        </figcaption>
      </figure>

      <motion.figure className="ba__panel ba__panel--after" style={reduceMotion ? undefined : { y: lift }}>
        <RevealImage src={after} alt={afterAlt} ratio={ratio} parallax={38} />
        <figcaption>
          <span className="ba__tag ba__tag--solid">After</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}
