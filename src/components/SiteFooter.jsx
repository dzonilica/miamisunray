import { InstagramLogo } from "@phosphor-icons/react";
import BrandMark from "./BrandMark";
import RollText from "./RollText";
import { resetConsent } from "../consent";
import { contact, legalNavigation, navigation, serviceAreas, site } from "../data";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="shell foot__top">
        <div className="foot__brand">
          <a href="/" aria-label="Sunray Contracting home">
            <BrandMark variant="dark" />
          </a>
          <p>
            Licensed and insured general contractor in Miami. Construction, renovation,
            stucco and painting across Miami-Dade, Broward and Palm Beach.
          </p>
        </div>

        <div className="foot__cols">
          <nav aria-labelledby="foot-pages">
            <h2 id="foot-pages">Pages</h2>
            {[{ label: "Home", href: "/" }, ...navigation].map((item) => (
              <a key={item.href} href={item.href}>
                <RollText>{item.label}</RollText>
              </a>
            ))}
          </nav>

          <div>
            <h2>Contact</h2>
            <a href={contact.phoneHref}>
              <RollText>{contact.phone}</RollText>
            </a>
            <a href={contact.emailHref}>
              <RollText>{contact.email}</RollText>
            </a>
            <a href={contact.instagramHref} target="_blank" rel="noreferrer" className="foot__ig">
              <InstagramLogo size={16} weight="regular" aria-hidden="true" />
              {contact.instagram}
            </a>
          </div>

          <div>
            <h2>Hours</h2>
            {contact.hours.map(([day, time]) => (
              <p key={day}>
                <span>{day}</span>
                {time}
              </p>
            ))}
          </div>

          <nav aria-labelledby="foot-legal">
            <h2 id="foot-legal">Legal</h2>
            {legalNavigation.map((item) => (
              <a key={item.href} href={item.href}>
                <RollText>{item.label}</RollText>
              </a>
            ))}
            <button className="foot__consent" type="button" onClick={resetConsent}>
              Cookie settings
            </button>
          </nav>
        </div>
      </div>

      <div className="shell foot__areas">
        <h2>Areas we serve</h2>
        <p>
          {serviceAreas.counties.join(" · ")} &mdash; {serviceAreas.cities.join(", ")}.
        </p>
      </div>

      <div className="shell foot__bottom">
        <p>
          &copy; {new Date().getFullYear()} {site.legalName} &middot; Licensed &amp; insured
          general contractor
        </p>
        <div className="foot__bottom-links">
          {legalNavigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
