# Fleet Pulse — Dashboard (frontend)

SPA **React 19 + Vite + Redux Toolkit** con mapa Leaflet, lista de flota, WebSocket y refetch periódico. Diseño visual propio (no es la UI de Traccar).

Repositorio **independiente** de la API (`FleetTelemetry.Backend`).

## Arquitectura (escalable, alineada con TraccarWeb)

- **`src/app/`** — raíz de la app, store Redux (`app/store`) y `App.jsx` que delega en features.
- **`src/features/`** — vertical slices por dominio (p. ej. `features/dashboard`: `pages/`, `hooks/`, `services/`).
- **`src/shared/ui/`** — diseño atómico:
  - **`atoms/`** — piezas mínimas (`StateBadge`, `GhostButton`, `PillDot`).
  - **`molecules/`** — composiciones (`VehicleCard`, `StatusPill`, `AlertsFeed`, …).
  - **`organisms/`** — bloques de pantalla (`DashboardTopBar`, `FleetSidePanel`, `FleetMapView`).
  - **`index.js`** — re-export opcional (como `shared/ui` en TraccarWeb).
- **`src/shared/hooks/`** — efectos reutilizables (`useFleetSocket`).
- **`src/shared/lib/`** — utilidades puras (`mapColors.js`).

## Desarrollo

Necesitas la API en `http://localhost:8080` .

```bash
npm ci
npm run dev
```

Abre `http://localhost:5173`. El proxy reenvía `/api`, `/health` y `/ws` al backend local.
