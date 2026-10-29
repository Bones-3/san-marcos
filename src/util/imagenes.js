// Vite resuelve estas rutas en build (hash) y en dev.
const IMAGENES = import.meta.glob('../assets/img/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** "bravery_lamb.webp" -> URL final del asset. */
export function urlImagen(ruta) {
  if (!ruta) return '';

  const normalizado = ruta.replaceAll('\\', '/');
  const nombreArchivo = normalizado.split('/').pop();

  const coincidencia = Object.entries(IMAGENES).find(([ruta]) => {
    return ruta.replaceAll('\\', '/').split('/').pop() === nombreArchivo;
  });

  if (coincidencia) return coincidencia[1];

  console.warn('No se encontró la imagen:', ruta);
  return '';
}