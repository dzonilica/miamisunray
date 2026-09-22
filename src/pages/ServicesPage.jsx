import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import ProjectCta from "../components/ProjectCta";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import ServiceQuickBar from "../components/ServiceQuickBar";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";
import { serviceGroups } from "../data";

function groupId(name) {
  return `group-${name.replace(/\s+/g, "-").toLowerCase()}`;
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Construction and renovation services in South Florida"
        lead="Eighteen services across six areas of the work, held under one contract and one point of contact."
        image="/media/services/roofing/01.jpg"
        alt="New tile roof on a recently completed Miami build"
        cta={{ label: "Get a free quote", href: "/contact" }}
        compact
      />

      <div className="services-layout shell">
        <ServiceQuickBar />

        <div className="services-body">
          {serviceGroups.map((group) => (
            <section className="service-group" key={group.name} aria-labelledby={groupId(group.name)}>
              <div className="service-group__head">
                <Reveal>
                  <Eyebrow>{group.name}</Eyebrow>
                </Reveal>
                <SplitText
                  as="h2"
                  id={groupId(group.name)}
                  className="display display--sm"
                  text={group.heading}
                />
                <Reveal delay={0.1}>
                  <p className="lead">{group.intro}</p>
                </Reveal>
              </div>

              <div className="service-cards">
                {group.items.map((service, index) => (
                  <article
                    className="service-card"
                    id={service.slug}
                    data-service={service.slug}
                    key={service.slug}
                  >
                    <Reveal delay={(index % 2) * 0.07}>
                      <RevealImage
                        className="service-card__media"
                        src={service.image}
                        alt={service.alt}
                        ratio="4 / 3"
                        parallax={46}
                        sizes={SIZES.card}
                      />
                      <div className="service-card__body">
                        <h3>{service.name}</h3>
                        <p>{service.line}</p>
                      </div>
                    </Reveal>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <Reveal className="services-note">
            <p>
              Not on the list? We take on work outside it regularly — specialist trades,
              repairs after storm damage, and jobs other contractors have walked away from.
              Ask, and we will tell you straight whether it is ours to do.
            </p>
            <a className="link-underline" href="/contact">
              <RollText>Ask about your project</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <ProjectCta
        eyebrow="Scope it out"
        title="Send us the scope and get a price"
        body="Drawings, a photograph, or a paragraph describing the job. Any of it is enough to start."
      />
    </>
  );
}
