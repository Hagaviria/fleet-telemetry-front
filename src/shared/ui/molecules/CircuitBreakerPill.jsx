export default function CircuitBreakerPill({ circuit }) {
  if (!circuit) return null;
  return (
    <div className="pill">
      CB persistencia:{" "}
      <strong style={{ marginLeft: 6 }}>{circuit.circuit_breaker}</strong>
      {" · "}
      cola {circuit.queue_depth}
    </div>
  );
}
