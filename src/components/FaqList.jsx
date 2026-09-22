import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import RevealImage from "./RevealImage";
import SplitText from "./SplitText";
import { useIsNarrow } from "../hooks";
import { SIZES } from "../media";
import { faqs } from "../data";

/*
 * Native <details> rows: the answers are in the DOM whether or not a row is
 * open, so they are indexed and readable with the keyboard, and there is no
 * accordion script to go wrong on a phone.
 *
 * Given a `media` photograph the two columns become parallax layers. The head
 * column is pushed back down against the scroll while the list is pulled up
 * with it, so they separate by roughly 140px on the way past instead of
 * travelling as one block, and the picture drifts again inside its own frame.
 * Pages that pass no photograph — the contact page, where this list sits under
 * a hero of its own — keep the plain two-column layout and no drift at all.
 *
 * The questions themselves are deliberately general: nothing here quotes a
 * price, a lead time or a licence number, because those are answered on the
 * walkthrough and would go stale on the page.
 *
 * The matching FAQPage structured data is emitted from src/seo.js for exactly
 * the routes that render this list.
 */
export default function FaqList({
  eyebrow = "Questions",
  title = "Questions we get asked before the first walkthrough",
  id = "faq",
  media = null,
  mediaAlt = "",
}) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  // A phone has one column, so there is nothing for a layer to separate from.
  const still = reduceMotion || narrow || !media;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headY = useTransform(scrollYProgress, [0, 1], [-46, 46]);
  const listY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      className="faq section-space"
      id={id}
      ref={sectionRef}
      aria-labelledby={`${id}-title`}
    >
      <div className="shell faq__grid">
        <motion.div
          className="faq__head"
          style={still ? undefined : { y: headY }}
        >
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitText as="h2" id={`${id}-title`} className="display display--sm" text={title} />

          {media && (
            <RevealImage
              className="faq__media"
              src={media}
              alt={mediaAlt}
              ratio="16 / 10"
              parallax={48}
              objectPosition="center 32%"
              sizes={SIZES.half}
            />
          )}
        </motion.div>

        <motion.div className="faq__list" style={still ? undefined : { y: listY }}>
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index, 3) * 0.05} distance={18}>
              <details className="faq__item" name={id}>
                <summary>
                  <h3>{item.q}</h3>
                  <span className="faq__mark" aria-hidden="true" />
                </summary>
                <div className="faq__answer">
                  <p>{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
