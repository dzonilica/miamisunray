import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Eyebrow from "../components/Eyebrow";
import FaqList from "../components/FaqList";
import HeroMedia from "../components/HeroMedia";
import ProjectCta from "../components/ProjectCta";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import ServiceAreas from "../components/ServiceAreas";
import SplitText from "../components/SplitText";
import { useIntroDone } from "../intro";
import { useIsNarrow } from "../hooks";
import { SIZES, imageSources } from "../media";
import { serviceGroups } from "../data";

const EASE = [0.165, 0.84, 0.44, 1];

/* The hover plate never renders wider than this, so the browser can pick a
   small variant instead of the 1440px original. */
const PLATE_SIZES = "284px";

const steps = [
  {
    title: "Free walkthrough",
    body: "We come to the property, measure what is there and listen to what you want out of it. No charge and no obligation.",
    tag: "No charge, no obligation",
  },
  {
    title: "Written scope and price",
    body: "A line-by-line scope that states what is included and what is not, with a price you can plan a budget around.",
    tag: "In writing, line by line",
  },
  {
    title: "Permits and build",
    body: "We file the drawings, pull the permits and run the trades. You keep one point of contact for the whole job.",
    tag: "One point of contact",
  },
  {
    title: "Handover",
    body: "Final inspection passed, site cleaned, and a walkthrough with you before we call the project finished.",
    tag: "Final inspection passed",
  },
];

function Hero() {
  const reduceMotion = useReducedMotion();
  // Held back until the opening loader lifts, so the type is not already in
  // place behind the panel.
  const start = useIntroDone();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroMedia />

      <div className="hero__content shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <Eyebrow tone="light">Miami &middot; South Florida</Eyebrow>
        </motion.div>

        <SplitText
          as="h1"
          id="hero-title"
          className="hero__title"
          text="Sunray Contracting"
          trigger="mount"
          active={start}
          delay={0.42}
          stagger={0.085}
          duration={1.15}
        />

        <motion.p
          className="hero__lead"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.76, ease: EASE }}
        >
          Custom homes, additions, impact windows, roofing, kitchen and bath remodeling and
          commercial build-outs across Miami-Dade, Broward and Palm Beach. Licensed, insured,
          and building here for more than 20 years.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.86, ease: EASE }}
        >
          <a className="btn btn--fill" href="/contact">
            <span className="btn__glyph" aria-hidden="true">
              &#8618;
            </span>
            <RollText>Get a free quote</RollText>
          </a>
          <a className="btn btn--ghost" href="/services">
            <RollText>See all services</RollText>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__cue"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 0.7, delay: start ? 1.05 : 0, ease: EASE }}
      >
        <span className="hero__cue-label">Scroll</span>
        <span className="hero__cue-rail">
          <span className="hero__cue-dot" />
        </span>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro section-space" aria-labelledby="intro-title">
      <div className="shell intro__grid">
        <div className="intro__copy">
          <Reveal>
            <Eyebrow>General contractors</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="intro-title"
            className="display"
            text="One licensed contractor from the permit set to the final inspection"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Sunray Contracting is a licensed and insured general contractor based in Miami
              and working across Miami-Dade, Broward and Palm Beach. We hold the contract for
              the whole job — drawings, permits, trades, inspections and handover — so you are
              not coordinating six companies yourself. Ground-up builds and single-room jobs
              get the same crew and the same standard.
            </p>
            <a className="link-underline" href="/about">
              <RollText>About the company</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <RevealImage
          className="intro__media"
          src="/media/timber-frame.jpg"
          alt="Timber roof structure being framed on a South Florida build"
          ratio="3 / 4"
          parallax={108}
          sizes={SIZES.half}
        />
      </div>
    </section>
  );
}

/*
 * The service index, read as a directory rather than a grid of cards.
 *
 * Six rows, one per group, each listing the services it actually contains as
 * chips — so the homepage states all eighteen in plain text instead of hiding
 * them one click away. The pictures are the reward for pointing at a row: a
 * single framed plate follows the cursor and swaps its source per row, which
 * keeps the list itself quiet and typographic.
 */
function ServiceIndex() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef(null);
  const [active, setActive] = useState(null);

  /* Raw pointer position, then the same values damped — the plate trails the
     cursor instead of being welded to it. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const plateX = useSpring(pointerX, { stiffness: 220, damping: 30, mass: 0.6 });
  const plateY = useSpring(pointerY, { stiffness: 220, damping: 30, mass: 0.6 });

  const trackPointer = (event) => {
    const box = listRef.current?.getBoundingClientRect();
    if (!box) return;
    pointerX.set(event.clientX - box.left);
    pointerY.set(event.clientY - box.top);
  };

  /* Jump the plate to the cursor before it is shown, so the first row you
     touch does not fly in from wherever the last one left it. */
  const enterRow = (index) => (event) => {
    if (active === null) {
      trackPointer(event);
      plateX.jump(pointerX.get());
      plateY.jump(pointerY.get());
    }
    setActive(index);
  };

  return (
    <section className="collection section-space" aria-labelledby="collection-title">
      <div className="shell">
        <div className="collection__head">
          <div>
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="collection-title"
              className="display"
              text="Construction and renovation services in Miami"
            />
          </div>
          <Reveal className="collection__head-link" delay={0.1}>
            <a className="link-underline" href="/services">
              <RollText>All 18 services</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <div
          className="index"
          ref={listRef}
          onPointerMove={reduceMotion ? undefined : trackPointer}
          onPointerLeave={() => setActive(null)}
        >
          <ul className="index__list">
            {serviceGroups.map((item, position) => (
              <Reveal
                as="li"
                className="index__row"
                key={item.name}
                delay={Math.min(position, 4) * 0.05}
                distance={18}
              >
                <a
                  href={`/services#${item.items[0].slug}`}
                  onPointerEnter={enterRow(position)}
                  onFocus={() => setActive(null)}
                >
                  <h3 className="index__name">{item.name}</h3>

                  <span className="index__tags">
                    {item.items.map((service) => (
                      <span className="index__tag" key={service.slug}>
                        {service.name}
                      </span>
                    ))}
                  </span>

                  <span className="index__go" aria-hidden="true">
                    &#8618;
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          {/* Decorative: every row already names its services in text.

              All six plates are mounted and stacked rather than swapping one
              src, so the first row you point at is not a blank frame waiting on
              a download, and moving between rows crossfades. */}
          {reduceMotion ? null : (
            <motion.div
              className="index__plate"
              aria-hidden="true"
              style={{ x: plateX, y: plateY }}
              initial={false}
              animate={{
                opacity: active === null ? 0 : 1,
                scale: active === null ? 0.92 : 1,
              }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <div className="index__plate-inner">
                {serviceGroups.map((item, position) => {
                  const sources = imageSources(item.image);
                  return (
                    <picture
                      key={item.name}
                      data-on={position === active ? "true" : "false"}
                    >
                      {sources.map((source) => (
                        <source
                          key={source.type}
                          type={source.type}
                          srcSet={source.srcSet}
                          sizes={PLATE_SIZES}
                        />
                      ))}
                      <img
                        src={item.image}
                        alt=""
                        sizes={sources.length ? PLATE_SIZES : undefined}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/*
 * The four steps, read as a run rather than a list.
 *
 * A single rail runs the height of the column and fills as the section passes,
 * and each marker takes the accent once its step is reached — so the block
 * shows the progression it is describing instead of only stating it. The dark
 * ground is the other half of the job: it breaks a long run of paper sections
 * and gives the page a second anchor between the hero and the closing band.
 */
function Approach() {
  const railRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [reached, setReached] = useState(reduceMotion ? steps.length - 1 : -1);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 68%"],
  });

  // Damped so the line does not twitch with every wheel tick.
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setReached(Math.min(steps.length - 1, Math.floor(value * steps.length + 0.35)));
  });

  return (
    <section className="approach-teaser section-space" aria-labelledby="approach-teaser-title">
      <div className="shell approach-teaser__grid">
        <div className="approach-teaser__copy">
          <Reveal>
            <Eyebrow tone="light">How we work</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="approach-teaser-title"
            className="display display--sm"
            text="How a project runs, in four steps"
          />
          <Reveal delay={0.12}>
            <p className="approach-teaser__lead">
              The same four steps on a single bathroom and on a ground-up house. You always
              know which one you are in, and what has to be signed before the next one starts.
            </p>
            <a className="link-underline link-underline--light" href="/approach">
              <RollText>Our approach in full</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <ol className="steps" ref={railRef}>
          <span className="steps__rail" aria-hidden="true">
            <motion.span
              className="steps__rail-fill"
              style={reduceMotion ? { scaleY: 1 } : { scaleY: fill }}
            />
          </span>

          {steps.map((step, index) => (
            <li
              className="steps__item"
              key={step.title}
              data-reached={index <= reached ? "true" : "false"}
            >
              <Reveal className="steps__card" delay={index * 0.06} distance={26}>
                <span className="steps__node" aria-hidden="true" />
                <span className="steps__ghost" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="steps__index">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="steps__tag">{step.tag}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/*
 * Recent work, as plates floating over the paper.
 *
 * Six photographs scattered down a tall ground rather than lined up in a row:
 * each one sits on its own columns, starts at its own height, and drifts at its
 * own rate as the section passes, so the set never resolves into a grid. All
 * six are driven from one section progress and differ only in amplitude — that
 * is what makes them read as floating against each other rather than as six
 * separate effects. The empty paper between them is doing the work; without it
 * there is nothing for the drift to be measured against.
 *
 * A phone has neither the width for the scatter nor the frames for six parallax
 * layers, so it gets a plain two-up grid; so does anyone who asked for reduced
 * motion.
 */
const workPlates = [
  {
    src: "/media/services/additions/01.jpg",
    alt: "Timber framing going up on a South Florida home addition",
    label: "Additions",
    meta: "Framing",
    ratio: "4 / 5",
    col: "1 / 6",
    lift: "0vw",
    drift: 104,
  },
  {
    src: "/media/services/impact-windows-doors/01.jpg",
    alt: "Room opening onto a terrace through full-height impact sliding doors",
    label: "Windows",
    meta: "Impact glazing",
    ratio: "4 / 3",
    col: "8 / 13",
    lift: "13vw",
    drift: 46,
  },
  {
    src: "/media/services/roofing/01.jpg",
    alt: "Clay barrel tile being laid on a Miami roof",
    label: "Roofing",
    meta: "Tile and flat roofs",
    ratio: "3 / 4",
    col: "4 / 9",
    lift: "6vw",
    drift: 138,
  },
  {
    src: "/media/services/pools/01.jpg",
    alt: "Finished pool and paver deck on a South Florida property",
    label: "Pools",
    meta: "Deck and coping",
    ratio: "16 / 11",
    col: "9 / 13",
    lift: "22vw",
    drift: 62,
  },
  {
    src: "/media/services/interior-design/05.jpg",
    alt: "Rebuilt kitchen with stone worktops in a South Florida remodel",
    label: "Kitchens",
    meta: "Stone and cabinetry",
    ratio: "1 / 1",
    col: "1 / 5",
    lift: "4vw",
    drift: 120,
  },
  {
    src: "/media/services/interior-design/07.jpg",
    alt: "Remodelled bathroom with new vanity, tile and shower",
    label: "Bathrooms",
    meta: "Tile and fittings",
    ratio: "3 / 4",
    col: "6 / 11",
    lift: "16vw",
    drift: 84,
  },
];

/* Two plates to a row on a phone, so the card default — which assumes one
   column there — would have the browser pull a file twice the width it needs. */
const WORK_PLATE_SIZES =
  "(max-width: 900px) calc(50vw - 28px), (max-width: 1180px) 45vw, 30vw";

function WorkPlate({ item, progress, still }) {
  /* One shared progress, one amplitude per plate. Hooks run either way — only
     the style that consumes them is dropped when the section is held still. */
  const y = useTransform(progress, [0, 1], [item.drift, -item.drift]);
  const sources = imageSources(item.src);

  return (
    <motion.figure
      className="work__plate"
      style={{
        "--col": item.col,
        "--lift": item.lift,
        "--ratio": item.ratio,
        ...(still ? null : { y }),
      }}
    >
      <span className="work__plate-frame">
        <picture>
          {sources.map((source) => (
            <source
              key={source.type}
              type={source.type}
              srcSet={source.srcSet}
              sizes={WORK_PLATE_SIZES}
            />
          ))}
          <img
            src={item.src}
            alt={item.alt}
            sizes={sources.length ? WORK_PLATE_SIZES : undefined}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </span>

      <figcaption className="work__plate-label">
        <span className="work__plate-name">{item.label}</span>
        <span className="work__plate-meta">{item.meta}</span>
      </figcaption>
    </motion.figure>
  );
}

function Work() {
  const fieldRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();
  const still = reduceMotion || narrow;

  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      className={`work section-space${still ? " work--still" : ""}`}
      aria-labelledby="work-title"
    >
      <div className="shell">
        <div className="work__head">
          <Reveal>
            <Eyebrow>Recent work</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="work-title"
            className="display display--sm"
            text="Recent renovation work in South Florida"
          />
          <Reveal className="work__head-link" delay={0.12}>
            <a className="link-underline" href="/services">
              <RollText>See what we build</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <div className="work__field" ref={fieldRef}>
          {workPlates.map((item) => (
            <WorkPlate
              key={item.src}
              item={item}
              progress={scrollYProgress}
              still={still}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Financing() {
  return (
    <section className="finance section-space" aria-labelledby="finance-title">
      <div className="shell finance__grid">
        {/* The same storefront sign the financing page leads with, so the two
            places a visitor meets this offer look like one another. A 3:2 frame
            cropped square loses only the outer edges, and the sign sits well
            inside them. */}
        <RevealImage
          className="finance__media"
          src="/media/storefront-logo.png"
          alt="The Sunray Contracting sign above the entrance to the office"
          ratio="1 / 1"
          parallax={86}
          sizes={SIZES.half}
        />
        <div className="finance__copy">
          <Reveal>
            <Eyebrow>Financing</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="finance-title"
            className="display display--sm"
            text="Home improvement financing for South Florida owners"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Financing is available on eligible improvements, with no down payment and
              approval that is not based on your credit score. We confirm in writing which
              programs apply to your property and your scope before anything is signed.
            </p>
            <a className="link-underline" href="/financing">
              <RollText>Financing options</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServiceIndex />
      <Approach />
      <Work />
      <Financing />
      <ServiceAreas />
      <FaqList
        media="/media/company-door.jpeg"
        mediaAlt="Reception desk and signage at the Sunray Contracting office"
      />
      <ProjectCta
        eyebrow="Next step"
        title="Get a free quote for your project"
        body="Send the scope, a drawing or a photograph. We will come back with the right first step and a price in writing."
      />
    </>
  );
}
