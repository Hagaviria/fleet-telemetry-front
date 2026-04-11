/** Color de marcador según estado de telemetría (hex para Leaflet). */
export function markerColorForState(state) {
  if (state === 'alert') return '#fb7185';
  if (state === 'stopped') return '#fbbf24';
  return '#5eead4';
}
