import { Phone } from "@phosphor-icons/react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import RollText from "./RollText";
import SplitText from "./SplitText";
import { contact } from "./../data";

export default function ProjectCta({
  eyebrow = "Next step",
  title = "Get a free quote for your project",
  body = "Send the outline of the work and we will come back with the right first step and a price in writing.",
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="shell cta-band__inner">
        <Reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText as="h2" id="cta-band-title" className="cta-band__title" text={title} />
        <Reveal delay={0.12}>
          <p className="cta-band__body">{body}</p>
        </Reveal>
        <Reveal className="cta-band__actions" delay={0.18}>
          <a className="btn btn--fill" href="/contact">
            <span className="btn__glyph" aria-hidden="true">
              &#8618;
            </span>
            <RollText>Request a quote</RollText>
          </a>
          <a className="btn btn--ghost" href={contact.phoneHref}>
            <Phone size={16} weight="fill" aria-hidden="true" />
            <RollText>{contact.phone}</RollText>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
