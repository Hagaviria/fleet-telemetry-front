import { PillDot } from "../atoms";

export default function StatusPill({
  active = false,
  children,
  className = "",
}) {
  return (
    <div className={`pill ${active ? "on" : ""} ${className}`.trim()}>
      <PillDot active={active} />
      {children}
    </div>
  );
}
