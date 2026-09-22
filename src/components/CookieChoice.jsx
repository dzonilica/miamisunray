import { CONSENT, getConsentRecord, resetConsent, setConsent, useConsent } from "../consent";

const LABELS = {
  [CONSENT.accepted]: "You accepted optional cookies.",
  [CONSENT.declined]: "You declined optional cookies.",
  [CONSENT.unset]: "You have not made a choice yet.",
};

function stamp(record) {
  if (!record?.at) return null;
  const when = new Date(record.at);
  if (Number.isNaN(when.getTime())) return null;
  return when.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

/*
 * The live control on the Cookie Policy page: states the current answer and
 * lets it be changed in place, so the policy is not a page that only describes
 * a choice made somewhere else.
 */
export default function CookieChoice() {
  const choice = useConsent();
  const recorded = stamp(getConsentRecord());

  return (
    <div className="cookie-choice">
      <p className="cookie-choice__state" aria-live="polite">
        {LABELS[choice]}
        {recorded && <span> Recorded {recorded}.</span>}
      </p>

      <div className="cookie-choice__actions">
        <button
          className="btn btn--fill btn--sm"
          type="button"
          onClick={() => setConsent(CONSENT.accepted)}
          disabled={choice === CONSENT.accepted}
        >
          Accept optional cookies
        </button>
        <button
          className="btn btn--outline btn--sm"
          type="button"
          onClick={() => setConsent(CONSENT.declined)}
          disabled={choice === CONSENT.declined}
        >
          Decline optional cookies
        </button>
        <button
          className="btn btn--bare btn--sm"
          type="button"
          onClick={resetConsent}
          disabled={choice === CONSENT.unset}
        >
          Clear my choice
        </button>
      </div>
    </div>
  );
}
