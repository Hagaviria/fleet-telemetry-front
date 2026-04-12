import { BrandBlock, CircuitBreakerPill, StatusPill } from "../molecules";

export default function DashboardTopBar({ wsConnected, circuit }) {
  return (
    <header className="top-bar">
      <BrandBlock title="Fleet Telemetry" />
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <StatusPill active={wsConnected}>
          {wsConnected ? "Tiempo real (WS)" : "Reconectando WS…"}
        </StatusPill>
        <CircuitBreakerPill circuit={circuit} />
      </div>
    </header>
  );
}
