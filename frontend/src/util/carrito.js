import { obtenerProductos } from '../data/productos';

const CARRITO_KEY = 'vsm_carrito';
const EVENTO = 'carrito:cambio';

function leer() {
  try {
    const items = JSON.parse(localStorage.getItem(CARRITO_KEY));
    return Array.isArray(items) ? items : [];
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

function limitarCantidad(cantidad, stock) {
  const unidades = Number.isFinite(cantidad) ? Math.trunc(cantidad) : 1;
  const maximo = stock === Infinity ? stock : Math.max(0, Math.floor(stock) || 0);
  return Math.min(Math.max(1, unidades), maximo);
}

export function obtenerLineasCarrito() {
  const catalogo = new Map(obtenerProductos().map((producto) => [producto.id, producto]));

  return leer().flatMap((item) => {
    const producto = catalogo.get(item?.id);
    if (!producto || !Number.isFinite(item.cantidad) || item.cantidad < 1) return [];

    const cantidad = limitarCantidad(item.cantidad, producto.stock);
    return cantidad > 0 ? [{ id: producto.id, cantidad, producto }] : [];
  });
}

export const contarCarrito = () =>
  obtenerLineasCarrito().reduce((total, item) => total + item.cantidad, 0);

export function agregarAlCarrito(id, cantidad = 1, stock = Infinity) {
  const items = leer();
  const existente = items.find((i) => i.id === id);
  const actual = existente ? existente.cantidad : 0;
  const nueva = limitarCantidad(actual + limitarCantidad(cantidad, Infinity), stock);

  if (nueva < 1) return;

  if (existente) existente.cantidad = nueva;
  else items.push({ id, cantidad: nueva });

  guardar(items);
}

export function cambiarCantidad(id, cantidad, stock = Infinity) {
  const nueva = limitarCantidad(cantidad, stock);
  if (nueva === 0) {
    quitarDelCarrito(id);
    return;
  }
  guardar(leer().map((i) => (i.id === id ? { ...i, cantidad: nueva } : i)));
}

export const quitarDelCarrito = (id) =>
  guardar(leer().filter((i) => i.id !== id));

export const vaciarCarrito = () => guardar([]);

/** Permite que el Header se actualice cuando cambia el carrito. */
export function suscribirCarrito(callback) {
  const actualizarDesdeOtraPestana = (evento) => {
    if (evento.key === CARRITO_KEY || evento.key === 'vsm_productos' || evento.key === null) {
      callback();
    }
  };

  window.addEventListener(EVENTO, callback);
  window.addEventListener('storage', actualizarDesdeOtraPestana);
  return () => {
    window.removeEventListener(EVENTO, callback);
    window.removeEventListener('storage', actualizarDesdeOtraPestana);
  };
}
