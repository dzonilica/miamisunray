import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import ProjectCta from "../components/ProjectCta";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import ServiceAreas from "../components/ServiceAreas";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";

const facts = [
  ["Trade", "General contracting: residential and commercial construction and renovation"],
  ["Experience", "More than 20 years building in South Florida"],
  ["Licensing", "Licensed and fully insured in the State of Florida"],
  ["Coverage", "Miami-Dade, Broward and Palm Beach counties"],
  ["Scale", "Ground-up custom homes down to single-room renovations"],
  ["Scope", "18 services held under one contract, including permits and engineering"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A licensed Miami contractor, 20 years in South Florida"
        lead="Sunray Contracting holds the whole job — drawings, permits, trades and handover — instead of the easy part of it."
        image="/media/sunray-field.jpg"
        alt="Sunray Contracting team member working on a South Florida project site"
        compact
      />

      <section className="story section-space" aria-labelledby="story-title">
        <div className="shell story__grid">
          <div className="story__copy">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="story-title"
              className="display"
              text="A licensed and insured construction company based in Miami"
            />
            <Reveal delay={0.12}>
              <p className="lead">
                Sunray Contracting is a fully licensed and insured contracting company working
                across Miami-Dade, Broward and Palm Beach. We take complex ground-up projects
                and smaller renovations with the same team and the same standard, and we
                provide our license and certificate of insurance on request before any
                contract is signed.
              </p>
              <p>
                Twenty years in South Florida is twenty years of hurricane code, of inspectors,
                of what a slab does in this ground and what a roof has to survive in September.
                That is what lets us price a job accurately at the start and stay ahead of the
                parts of a build that usually go wrong. The walkthrough and the quote are free.
              </p>
            </Reveal>
          </div>

          <RevealImage
            className="story__media"
            src="/media/storefront-logo.png"
            alt="Sunray Contracting signage at the company premises in Miami"
            ratio="4 / 5"
            parallax={96}
            sizes={SIZES.half}
          />
        </div>
      </section>

      <section className="facts section-space" aria-labelledby="facts-title">
        <div className="shell">
          <Reveal>
            <Eyebrow>The short version</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="facts-title"
            className="display display--sm"
            text="Sunray Contracting at a glance"
          />

          <dl className="facts__list">
            {facts.map(([term, detail], index) => (
              <Reveal key={term} delay={Math.min(index, 3) * 0.06} distance={20}>
                <div className="facts__row">
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="band" aria-labelledby="band-title">
        <RevealImage
          className="band__media"
          src="/media/services/commercial-projects/02.jpg"
          alt="Commercial construction project underway in South Florida"
          parallax={128}
          sizes={SIZES.full}
        />
        <div className="shell band__inner">
          <SplitText
            as="h2"
            id="band-title"
            className="display band__title"
            text="20+ years on South Florida sites"
          />
          <Reveal delay={0.12}>
            <p>
              Long enough to know which corners cannot be cut in a High-Velocity Hurricane
              Zone, which submittals the building department will send back, and which parts
              of a schedule move before a job is finished.
            </p>
            <a className="link-underline link-underline--light" href="/approach">
              <RollText>How we run a project</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <ServiceAreas />

      <ProjectCta
        eyebrow="Get started"
        title="Start with a free walkthrough"
        body="A site visit and a written quote cost you nothing and commit you to nothing."
      />
    </>
  );
}
