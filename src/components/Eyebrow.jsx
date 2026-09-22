/* Small tracked label with a rotated square marker, used to open a section. */
export default function Eyebrow({ children, className = "", tone = "", as: Tag = "p" }) {
  return (
    <Tag className={`mono-label ${tone ? `mono-label--${tone}` : ""} ${className}`.trim()}>
      <span className="mono-label__mark" aria-hidden="true" />
      {children}
    </Tag>
  );
}
