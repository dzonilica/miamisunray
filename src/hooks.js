import { useEffect, useState } from "react";

/*
 * Media query as state. Reads once on mount rather than during render, so the
 * first paint is the same on the server-side-rendered markup and the client.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* One shared definition of "this is a phone" for the JS side of the layout.
   Matches the 900px breakpoint the stylesheet collapses the grids at. */
export const NARROW = "(max-width: 900px)";

export function useIsNarrow() {
  return useMediaQuery(NARROW);
}
