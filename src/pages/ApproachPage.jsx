import DrawnHero from "../components/DrawnHero";
import Eyebrow from "../components/Eyebrow";
import ProjectCta from "../components/ProjectCta";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";

const phases = [
  {
    title: "Free site walkthrough",
    body: "We come to the property, measure what is there, look at access, drainage and the existing structure, and listen to what you want. No charge and no pressure to sign anything.",
    image: "/media/services/engineering/02.jpg",
    alt: "Reviewing project drawings on a Miami site during a walkthrough",
  },
  {
    title: "Written scope and price",
    body: "You get a line-by-line scope and a price. What is included is on the page, and so is what is not — allowances, exclusions and the assumptions the number rests on.",
    image: "/media/services/concrete/02.jpg",
    alt: "Concrete formwork being set out on a South Florida building site",
  },
  {
    title: "Drawings and permits",
    body: "Architectural and structural drawings, calculations, submittal to the Miami-Dade or Broward building department, and any revisions, all handled before the first delivery arrives.",
    image: "/media/services/engineering/01.jpg",
    alt: "Engineer working through a permit drawing set for a Miami project",
  },
  {
    title: "Build and inspections",
    body: "Trades come and go and inspections get scheduled and passed. You keep one point of contact and one schedule, rather than a phone full of subcontractors.",
    image: "/media/services/additions/01.jpg",
    alt: "Home addition under construction in South Florida",
  },
  {
    title: "Handover",
    body: "Final inspection passed, punch list closed out, site cleaned, and a walkthrough together before we call the project finished.",
    image: "/media/services/interior-design/04.jpg",
    alt: "Completed interior handed over after a Miami renovation",
  },
];

const commitments = [
  ["One contract", "You sign with us and call one number, not five subcontractors."],
  ["Written scope", "The quote states what is included and what is excluded before work starts."],
  ["Permits pulled", "Submittals, revisions and inspections are our scope, not the owner's."],
  ["Clean exit", "The site is left the way we would want our own left."],
];

export default function ApproachPage() {
  return (
    <>
      <DrawnHero
        eyebrow="Approach"
        title="How a Sunray Contracting project actually runs"
        lead="Five steps, in this order, from the free walkthrough to final inspection and handover."
        drawn="/media/approach/house-drawn.png"
        built="/media/approach/house-built.jpg"
        alt="A two-storey South Florida home drawn in line, with the finished build revealed underneath it as the page is scrolled"
      />

      <section className="phases section-space" aria-labelledby="phases-title">
        <div className="shell phases__layout">
          <div className="phases__rail">
            <Reveal>
              <Eyebrow>The sequence</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="phases-title"
              className="display display--sm"
              text="Five steps, in this order, on every job"
            />
            <Reveal delay={0.12}>
              <p className="lead">
                The order is what keeps a project from drifting and a budget from moving. We
                do not start work ahead of a permit to protect a start date, and we do not
                price a job we have not walked.
              </p>
            </Reveal>
          </div>

          <ol className="phases__list">
            {phases.map((phase, index) => (
              <li className="phase" key={phase.title}>
                <Reveal delay={0.04}>
                  <span className="phase__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="phase__copy">
                    <h3>{phase.title}</h3>
                    <p>{phase.body}</p>
                  </div>
                </Reveal>
                <RevealImage
                  className="phase__media"
                  src={phase.image}
                  alt={phase.alt}
                  ratio="16 / 10"
                  parallax={54}
                  sizes={SIZES.content}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="commitments section-space" aria-labelledby="commitments-title">
        <div className="shell commitments__grid">
          <div className="commitments__copy">
            <Reveal>
              <Eyebrow>What you get</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="commitments-title"
              className="display display--sm"
              text="Four things we hold to on every contract"
            />
          </div>

          <dl className="commitments__list">
            {commitments.map(([term, detail], index) => (
              <Reveal key={term} delay={index * 0.06} distance={20}>
                <div className="commitments__row">
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <ProjectCta
        eyebrow="Step one"
        title="Book the free walkthrough"
        body="It costs nothing, commits you to nothing, and it is how every project here starts."
      />
    </>
  );
}
