import { useEffect, useRef, useState } from "react";
import { contact } from "../data";

/*
 * Quote request.
 *
 * Nothing is posted anywhere: the form assembles a prefilled message in the
 * visitor's own mail client, which is what the Privacy Policy says it does.
 * Connect a form endpoint before launch if submissions should arrive directly,
 * and update that policy section in the same change.
 *
 * Input types, inputMode and enterKeyHint are set per field so a phone keyboard
 * opens on the right layout and the return key says the right thing.
 */
export default function QuoteForm() {
  const [status, setStatus] = useState("idle");
  const timerRef = useRef();

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `Quote request from ${data.get("firstName")} ${data.get("lastName")}`;
    const body = [
      `Name: ${data.get("firstName")} ${data.get("lastName")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Project type: ${data.get("projectType")}`,
      `ZIP code: ${data.get("zip") || "Not provided"}`,
      "",
      data.get("message"),
    ].join("\n");

    setStatus("preparing");
    timerRef.current = window.setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("ready");
    }, 240);
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>First name</span>
          <input
            name="firstName"
            autoComplete="given-name"
            autoCapitalize="words"
            enterKeyHint="next"
            required
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            name="lastName"
            autoComplete="family-name"
            autoCapitalize="words"
            enterKeyHint="next"
            required
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            enterKeyHint="next"
            required
          />
        </label>
        <label>
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>Project type</span>
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>
            <option>Custom home</option>
            <option>Addition or full renovation</option>
            <option>Kitchen or bathroom remodel</option>
            <option>Impact windows and doors</option>
            <option>Roofing or exterior</option>
            <option>Pool, driveway or site work</option>
            <option>Solar, AC or insulation</option>
            <option>Commercial build-out</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>ZIP code</span>
          <input
            name="zip"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            autoComplete="postal-code"
            enterKeyHint="next"
          />
        </label>
      </div>

      <label>
        <span>Tell us about your project</span>
        <textarea name="message" rows="5" enterKeyHint="enter" required />
      </label>

      <div className="form-submit">
        <button className="btn btn--fill" type="submit" disabled={status === "preparing"}>
          <span className="btn__glyph" aria-hidden="true">
            &#8618;
          </span>
          {status === "preparing" ? "Preparing request" : "Request a quote"}
        </button>
        <p className="form-note" aria-live="polite">
          {status === "ready" ? (
            <>
              Email draft requested. If nothing opened, write to{" "}
              <a href={contact.emailHref}>{contact.email}</a> directly.
            </>
          ) : (
            <>
              Submitting opens a prefilled email in your own mail app for you to review and
              send. Nothing is stored on this site — see the{" "}
              <a href="/privacy">Privacy Policy</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
