import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { legal } from "../data";

/*
 * Shared shell for the policy pages. No hero photograph and no parallax: these
 * are documents, and the job is to make a long read legible on a phone.
 *
 * `sections` is a list of { id, heading, body }, where body is already JSX.
 * Every section is linkable, and the contents list at the top is a real jump
 * list rather than decoration.
 */
export default function LegalPage({ eyebrow, title, lead, sections }) {
  return (
    <article className="legal">
      <header className="legal__head shell">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText as="h1" id="page-title" className="legal__title" text={title} trigger="mount" />
        <Reveal delay={0.1}>
          {lead && <p className="lead">{lead}</p>}
          <p className="legal__updated">
            Last updated{" "}
            <time dateTime={legal.updatedISO}>{legal.updated}</time>
          </p>
        </Reveal>
      </header>

      <div className="shell legal__layout">
        <nav className="legal__toc" aria-label="On this page">
          <p className="legal__toc-title">On this page</p>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal__body">
          {sections.map((section, index) => (
            <section className="legal__section" id={section.id} key={section.id}>
              <h2>
                <span className="legal__section-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              {section.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
