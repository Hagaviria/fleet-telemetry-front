export default function GhostButton({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      className={`btn-ghost ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
