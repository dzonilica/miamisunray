import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import ProjectCta from "../components/ProjectCta";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";

/*
 * Program terms are quoted from the client's own material and framed as subject
 * to confirmation, since eligibility and availability change.
 */
const features = [
  ["No down payment", "Eligible improvements can be financed with $0 due at signing."],
  ["Not credit-score based", "Approval is assessed on the property, not on your credit score."],
  ["Short application", "A single application, not a mortgage-length underwriting process."],
  ["Payments spread over time", "The cost is spread across a term instead of paid in one sum."],
  ["Deferred start on some programs", "Certain programs defer the first payment after completion."],
  ["Repaid through property taxes", "Repayment is collected as a line on the annual property tax bill."],
];

const path = [
  [
    "01",
    "Tell us the project",
    "A roof replacement, impact windows, an AC changeout or a full renovation. We start from the work itself and what it will cost to do properly.",
  ],
  [
    "02",
    "Check eligibility",
    "We look at what the current programs cover in your county, and whether your property and your scope qualify for them.",
  ],
  [
    "03",
    "See the terms in writing",
    "Amount, term, payment schedule and what happens at sale of the property, all in writing before you decide anything.",
  ],
];

export default function FinancingPage() {
  return (
    <>
      <PageHero
        eyebrow="Financing"
        title="Home improvement financing in South Florida"
        lead="Financing may be available on eligible improvements in Miami-Dade, Broward and Palm Beach."
        image="/media/storefront-logo.png"
        bright
        alt="The Sunray Contracting sign above the entrance to the office"
        cta={{ label: "Ask about financing", href: "/contact" }}
        compact
      />

      <section className="finance-intro section-space" aria-labelledby="finance-intro-title">
        <div className="shell finance-intro__grid">
          <div className="finance-intro__copy">
            <Reveal>
              <Eyebrow>The idea</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="finance-intro-title"
              className="display"
              text="Repair and upgrade the property without paying for it all at once"
            />
            <Reveal delay={0.12}>
              <p className="lead">
                Programs for eligible home improvements in South Florida can include terms
                like the ones listed here. Which of them apply to you depends on the property,
                the county and the scope of the work, and we confirm that before anything is
                signed.
              </p>
            </Reveal>
          </div>

          <ul className="finance-list">
            {features.map(([label, detail], index) => (
              <li key={label}>
                <Reveal delay={Math.min(index, 3) * 0.05} distance={18}>
                  <span className="finance-list__mark" aria-hidden="true" />
                  <span className="finance-list__copy">
                    <strong>{label}</strong>
                    <span>{detail}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="finance-path section-space" aria-labelledby="finance-path-title">
        <div className="shell">
          <div className="finance-path__head">
            <Reveal>
              <Eyebrow>How it goes</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="finance-path-title"
              className="display display--sm"
              text="Three steps to a straight answer"
            />
          </div>

          <ol className="finance-path__list">
            {path.map(([index, title, body]) => (
              <li key={index}>
                <Reveal distance={22}>
                  <span className="finance-path__index" aria-hidden="true">
                    {index}
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="finance-note section-space" aria-labelledby="finance-note-title">
        <div className="shell finance-note__grid">
          <RevealImage
            className="finance-note__media"
            src="/media/services/roofing/02.jpg"
            alt="Roof replacement in progress on a South Florida residence"
            ratio="4 / 3"
            parallax={86}
            sizes={SIZES.half}
          />
          <div className="finance-note__copy">
            <Reveal>
              <Eyebrow>Before you sign</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="finance-note-title"
              className="display display--sm"
              text="Confirm the details with us first"
            />
            <Reveal delay={0.12}>
              <p className="lead">
                Financing programs change. Rates, terms, approval criteria and payment
                schedules are not guaranteed by this page, are set by the program provider
                rather than by us, and are confirmed in writing during your consultation.
                Sunray Contracting is a contractor, not a lender.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ProjectCta
        eyebrow="Ask us"
        title="Ask what applies to your property"
        body="Tell us what you want repaired or upgraded and we will check what is currently available for it."
      />
    </>
  );
}
