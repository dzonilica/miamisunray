/*
 * Wordmark on a transparent ground. Both cuts ship in the markup so switching
 * between the light and the ink version is an opacity flip rather than a fetch
 * part-way through a scroll. "auto" follows the nav state; the fixed variants
 * are for surfaces whose tone never changes.
 */
export default function BrandMark({ variant = "auto", className = "" }) {
  return (
    <span className={`brand-mark ${className}`.trim()} data-variant={variant}>
      <img
        className="brand-mark__img brand-mark__img--light"
        src="/media/sunray-logo-light.png"
        alt="Sunray Contracting"
        decoding="async"
      />
      <img
        className="brand-mark__img brand-mark__img--dark"
        src="/media/sunray-logo-dark.png"
        alt=""
        aria-hidden="true"
        decoding="async"
      />
    </span>
  );
}
