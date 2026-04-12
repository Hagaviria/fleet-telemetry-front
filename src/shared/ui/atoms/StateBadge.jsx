const labels = {
  moving: "moving",
  stopped: "stopped",
  alert: "alert",
  inactive: "sin señal",
};

export default function StateBadge({ state = "moving" }) {
  const text = labels[state] ?? state;
  return <span className={`state-badge ${state}`}>{text}</span>;
}
