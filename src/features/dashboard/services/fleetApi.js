/**
 * Cliente HTTP del dominio flota (aislado para tests y reutilización).
 */
export async function fetchVehicles() {
  const res = await fetch('/api/v1/vehicles');
  if (!res.ok) throw new Error('vehicles');
  return res.json();
}

export async function fetchCircuitDetail() {
  const res = await fetch('/api/v1/health/detail');
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch('/api/v1/alerts');
  if (!res.ok) throw new Error('alerts');
  return res.json();
}

export async function deleteVehicleRemote(id) {
  const res = await fetch(`/api/v1/vehicles/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('delete failed');
}
