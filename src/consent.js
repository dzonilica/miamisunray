import { useEffect, useState } from "react";

/*
 * Cookie consent state.
 *
 * The site itself only needs one strictly necessary key (the opening loader
 * remembers that it has already played, per tab). Everything optional —
 * analytics, remarketing pixels, embedded maps — is gated behind an explicit
 * "accepted" here and must stay that way.
 *
 * Declining is stored just as deliberately as accepting, so the banner does not
 * come back on every page and so the choice can be shown and changed later.
 */

const KEY = "sunray:cookie-consent";
const VERSION = 1;

export const CONSENT = {
  accepted: "accepted",
  declined: "declined",
  unset: "unset",
};

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== VERSION) return null;
    if (parsed.choice !== CONSENT.accepted && parsed.choice !== CONSENT.declined) return null;
    return parsed;
  } catch {
    // Private mode, blocked storage, or a hand-edited value: treat as no answer.
    return null;
  }
}

let current = null;
let loaded = false;
const listeners = new Set();

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  current = read();
}

export function getConsent() {
  ensureLoaded();
  return current?.choice ?? CONSENT.unset;
}

export function getConsentRecord() {
  ensureLoaded();
  return current;
}

export function setConsent(choice) {
  if (choice !== CONSENT.accepted && choice !== CONSENT.declined) return;

  const record = { choice, version: VERSION, at: new Date().toISOString() };
  loaded = true;
  current = record;

  try {
    window.localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // The decision still holds for this page view even if it cannot be stored.
  }

  listeners.forEach((listener) => listener(choice));
}

/* Wipes the stored answer and brings the banner back. Used by the "Cookie
   settings" control in the footer. */
export function resetConsent() {
  loaded = true;
  current = null;

  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to remove if it was never written.
  }

  listeners.forEach((listener) => listener(CONSENT.unset));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useConsent() {
  const [choice, setChoice] = useState(CONSENT.unset);

  useEffect(() => {
    setChoice(getConsent());
    return subscribe(setChoice);
  }, []);

  return choice;
}

/* True only after a visitor has actively accepted. Anything optional should be
   behind this and nothing else. */
export function analyticsAllowed() {
  return getConsent() === CONSENT.accepted;
}
