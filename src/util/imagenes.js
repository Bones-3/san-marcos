// Vite resuelve estas rutas en build (hash) y en dev.
const IMAGENES = import.meta.glob('../assets/img/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** "bravery_lamb.webp" -> URL final del asset. */
export function urlImagen(nombreArchivo) {
  return IMAGENES[`../assets/img/${nombreArchivo}`] ?? '';
}
