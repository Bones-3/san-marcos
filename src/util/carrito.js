const CARRITO_KEY = 'vsm_carrito';
const EVENTO = 'carrito:cambio';

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
  } catch {
    return [];
  }
}

function guardar(items) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENTO));
}

/** Devuelve [{ id, cantidad }] */
export const obtenerCarrito = () => leer();

export const contarCarrito = () =>
  leer().reduce((total, item) => total + item.cantidad, 0);

export function agregarAlCarrito(id, cantidad = 1, stock = Infinity) {
  const items = leer();
  const existente = items.find((i) => i.id === id);
  if (existente) {
    existente.cantidad = Math.min(existente.cantidad + cantidad, stock);
  } else {
    items.push({ id, cantidad: Math.min(cantidad, stock) });
  }
  guardar(items);
}

export function cambiarCantidad(id, cantidad, stock = Infinity) {
  const nueva = Math.min(Math.max(1, cantidad), stock);
  guardar(leer().map((i) => (i.id === id ? { ...i, cantidad: nueva } : i)));
}

export const quitarDelCarrito = (id) =>
  guardar(leer().filter((i) => i.id !== id));

export const vaciarCarrito = () => guardar([]);

/** Permite que el Header se actualice cuando cambia el carrito. */
export function suscribirCarrito(callback) {
  window.addEventListener(EVENTO, callback);
  return () => window.removeEventListener(EVENTO, callback);
}
