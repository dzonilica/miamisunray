import { mediaVariants } from "./media-manifest";

/*
 * srcset plumbing for the photographs in public/media.
 *
 * Every photograph has AVIF and WebP width variants built beside it
 * (scripts/build-media.mjs). The original JPEG/PNG stays as the <img> src so
 * nothing breaks where neither is supported, and the modern sets are offered
 * through <source> elements above it — AVIF first, since it lands at roughly a
 * third less weight than the same WebP, then WebP for the browsers that miss it.
 */

const FORMATS = [
  { key: "avif", type: "image/avif" },
  { key: "webp", type: "image/webp" },
];

/*
 * Returns the <source> descriptors for a photograph, in the order a browser
 * should be offered them. Empty for anything with no variants built, which is
 * how the brand marks and any freshly dropped file stay safe: the <img> src
 * alone still renders.
 */
export function imageSources(src) {
  const variants = mediaVariants[src];
  if (!variants) return [];

  const base = src.replace(/\.(jpe?g|png)$/i, "");
  return FORMATS.flatMap(({ key, type }) => {
    const widths = variants[key];
    if (!widths?.length) return [];
    return [{ type, srcSet: widths.map((width) => `${base}-${width}.${key} ${width}w`).join(", ") }];
  });
}

/*
 * Default sizes hint. Phones get one column at the full content width, so the
 * viewport width minus the gutter is the honest answer there; above that the
 * layouts are two- and three-column and the browser can cap at a third.
 */
export const SIZES = {
  full: "100vw",
  content: "(max-width: 900px) calc(100vw - 40px), (max-width: 1400px) 60vw, 800px",
  half: "(max-width: 900px) calc(100vw - 40px), 45vw",
  card: "(max-width: 680px) calc(100vw - 40px), (max-width: 1180px) 45vw, 30vw",
  thumb: "(max-width: 680px) 50vw, 25vw",
};
