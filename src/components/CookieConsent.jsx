import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CONSENT, setConsent, subscribe, getConsent } from "../consent";

const EASE = [0.165, 0.84, 0.44, 1];

/*
 * Cookie notice.
 *
 * Accept and Decline carry the same visual weight, sit next to each other, and
 * both close the banner for good — declining is not made harder than accepting.
 * Nothing optional runs before a choice is made, so the banner never blocks the
 * page: it is a bar at the bottom, not a modal over the content.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(getConsent() === CONSENT.unset);
    return subscribe((choice) => setOpen(choice === CONSENT.unset));
  }, []);

  const decide = (choice) => () => setConsent(choice);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="cookie-bar"
          role="region"
          aria-label="Cookie notice"
          initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
        >
          <div className="cookie-bar__inner">
            <div className="cookie-bar__copy">
              <h2>Cookies on this site</h2>
              <p>
                Strictly necessary storage keeps this site working. Optional analytics run
                only if you accept — decline and nothing optional is set.{" "}
                <a href="/cookies">Cookie Policy</a> · <a href="/privacy">Privacy Policy</a>
              </p>
            </div>

            <div className="cookie-bar__actions">
              <button
                className="btn btn--fill btn--sm"
                type="button"
                onClick={decide(CONSENT.accepted)}
              >
                Accept
              </button>
              <button
                className="btn btn--outline btn--sm"
                type="button"
                onClick={decide(CONSENT.declined)}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
