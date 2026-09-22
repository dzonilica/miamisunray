/*
 * Label that rolls to a duplicate of itself on hover. The parent link or button
 * owns the hover state, so this stays a presentational wrapper.
 */
export default function RollText({ children, className = "" }) {
  return (
    <span className={`roll ${className}`.trim()}>
      <span className="roll__stack">
        <span className="roll__line">{children}</span>
        <span className="roll__line" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
