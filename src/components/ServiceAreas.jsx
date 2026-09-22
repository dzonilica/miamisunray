import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { serviceAreas } from "../data";

/*
 * Where the work actually happens, named. Counties are how a job is permitted
 * and bid; the city list is how people search. Both belong on the page in plain
 * text rather than in a map embed that sets third-party cookies.
 */
export default function ServiceAreas({ id = "service-areas" }) {
  return (
    <section className="areas section-space" id={id} aria-labelledby={`${id}-title`}>
      <div className="shell areas__grid">
        <div className="areas__copy">
          <Reveal>
            <Eyebrow>Service area</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id={`${id}-title`}
            className="display display--sm"
            text="Where Sunray Contracting works in South Florida"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              We build and renovate across three counties. If your property is outside them,
              call anyway and we will tell you honestly whether the job is ours.
            </p>
          </Reveal>
        </div>

        <div className="areas__lists">
          <Reveal distance={18}>
            <h3 className="areas__label">Counties</h3>
            <ul className="areas__counties">
              {serviceAreas.counties.map((county) => (
                <li key={county}>{county}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} distance={18}>
            <h3 className="areas__label">Cities and neighbourhoods</h3>
            <ul className="areas__cities">
              {serviceAreas.cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
