# Fleet Pulse — Dashboard (frontend)

SPA **React 19 + Vite + Redux Toolkit** con mapa Leaflet, lista de flota, WebSocket y refetch periódico. Diseño visual propio.

## Arquitectura 

- **`src/app/`** — raíz de la app, store Redux (`app/store`) y `App.jsx` que delega en features.
- **`src/features/`** — vertical slices por dominio .
- **`src/shared/ui/`** — diseño atómico:
  - **`atoms/`.
  - **`molecules/`.
  - **`organisms/`.
  - **`index.js`.
- **`src/shared/hooks/`.
- **`src/shared/lib/`.

## Desarrollo

Necesitas la API en `http://localhost:8080` .

```bash
npm ci
npm run dev
```

Abre `http://localhost:5173`. El proxy reenvía `/api`, `/health` y `/ws` al backend local.
