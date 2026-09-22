import { useEffect, useState } from "react";

/*
 * In-page routing.
 *
 * Every page already ships in the same bundle, so moving between them never
 * needed a document load. Going through the browser meant the new document
 * painted bare paper for a frame or two before React could put the curtain
 * back up — the white flash in the middle of the transition. Pushing history
 * instead keeps the curtain on screen the whole way across.
 */

const listeners = new Set();

function read() {
  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
  };
}

function announce() {
  const next = read();
  listeners.forEach((listener) => listener(next));
}

export function navigate(href, { replace = false } = {}) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.href = url.href;
    return;
  }
  if (url.href === window.location.href) return;

  window.history[replace ? "replaceState" : "pushState"]({}, "", url.href);
  announce();
}

export function useLocation() {
  const [location, setLocation] = useState(read);

  useEffect(() => {
    const update = () => setLocation(read());
    listeners.add(update);
    // Back and forward move the URL without going through navigate().
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return location;
}
