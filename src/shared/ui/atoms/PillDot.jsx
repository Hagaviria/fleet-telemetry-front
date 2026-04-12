export default function PillDot({ active = false }) {
  return <span className={`pill-dot ${active ? "on" : ""}`} aria-hidden />;
}
