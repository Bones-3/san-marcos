const ORDENES_KEY = 'vsm_ordenes';

export function obtenerOrdenes() {
  try {
    return JSON.parse(localStorage.getItem(ORDENES_KEY)) || [];
  } catch {
    return [];
  }
}

export const guardarOrdenes = (lista) =>
  localStorage.setItem(ORDENES_KEY, JSON.stringify(lista));
