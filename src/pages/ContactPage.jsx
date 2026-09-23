import { EnvelopeSimple, InstagramLogo, Phone } from "@phosphor-icons/react";
import Eyebrow from "../components/Eyebrow";
import FaqList from "../components/FaqList";
import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";
import { contact, serviceAreas } from "../data";

const channels = [
  { label: "Call", value: contact.phone, href: contact.phoneHref, Icon: Phone },
  { label: "Email", value: contact.email, href: contact.emailHref, Icon: EnvelopeSimple },
  {
    label: "Instagram",
    value: contact.instagram,
    href: contact.instagramHref,
    Icon: InstagramLogo,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a free quote in Miami"
        lead="Call, email, or send the project details and a licensed contractor will come back to you."
        image="/media/company-door.jpeg"
        alt="Entrance to the Sunray Contracting office in Miami"
        compact
      />

      <section className="contact-main section-space" aria-labelledby="contact-main-title">
        <div className="shell contact-main__grid">
          <div className="contact-main__side">
            <Reveal>
              <Eyebrow>Direct</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="contact-main-title"
              className="display display--sm"
              text="Reach a contractor, not a call centre"
            />

            <Reveal className="channels" delay={0.1}>
              {channels.map(({ label, value, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <Icon size={20} weight="regular" aria-hidden="true" />
                  <span>
                    <small>{label}</small>
                    {value}
                  </span>
                </a>
              ))}
            </Reveal>

            <Reveal className="hours" delay={0.16}>
              <h3>Opening hours</h3>
              <dl>
                {contact.hours.map(([day, time]) => (
                  <div key={day}>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="contact-main__form" delay={0.08}>
            <h2 className="contact-main__form-title">Tell us about the project</h2>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="coverage section-space" aria-labelledby="coverage-title">
        <div className="shell coverage__grid">
          <RevealImage
            className="coverage__media"
            src="/media/services/commercial-projects/01.jpg"
            alt="Commercial building in South Florida built by Sunray Contracting"
            ratio="4 / 3"
            parallax={92}
            sizes={SIZES.half}
          />
          <div className="coverage__copy">
            <Reveal>
              <Eyebrow>Where we work</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="coverage-title"
              className="display display--sm"
              text="Miami and across South Florida"
            />
            <Reveal delay={0.12}>
              <p className="lead">
                Residential work of every kind, and commercial stucco, painting and concrete,
                in {serviceAreas.counties.join(", ")}, from Homestead up to West Palm Beach. If
                you are outside that, ask anyway and we will tell you honestly whether we are
                the right call.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqList
        eyebrow="Before you call"
        title="Questions we get asked most often"
        id="contact-faq"
      />
    </>
  );
}
