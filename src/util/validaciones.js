// Reglas según Anexo 1 (Evaluación Parcial 1).
const DOMINIOS = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarRun(run) {
  const limpio = String(run || '').trim().toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  return dv === esperado;
}

export function validarCorreo(correo) {
  const valor = String(correo || '').trim().toLowerCase();
  if (!valor) return 'El correo es obligatorio.';
  if (valor.length > 100) return 'Máximo 100 caracteres.';
  if (!REGEX_CORREO.test(valor)) return 'Ingresa un correo válido.';
  if (!DOMINIOS.some((d) => valor.endsWith(d))) {
    return 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  return '';
}

function validarClave(clave) {
  if (!clave) return 'La contraseña es obligatoria.';
  if (clave.length < 4 || clave.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  return '';
}

/** Quita las claves cuyo mensaje de error esté vacío. */
const soloErrores = (errores) =>
  Object.fromEntries(Object.entries(errores).filter(([, msg]) => msg));

export function validarLogin({ correo, clave }) {
  return soloErrores({
    correo: validarCorreo(correo),
    clave: validarClave(clave),
  });
}

export function validarContacto({ nombre, correo, comentario }) {
  return soloErrores({
    nombre: !nombre.trim()
      ? 'El nombre es obligatorio.'
      : nombre.length > 100
        ? 'Máximo 100 caracteres.'
        : '',
    correo: validarCorreo(correo),
    comentario: !comentario.trim()
      ? 'El comentario es obligatorio.'
      : comentario.length > 500
        ? 'Máximo 500 caracteres.'
        : '',
  });
}

/** esAdmin = true permite dejar la contraseña vacía (edición). */
export function validarRegistroUsuario(v, esAdmin = false) {
  return soloErrores({
    run: validarRun(v.run) ? '' : 'RUN inválido (sin puntos ni guion, ej: 190110222).',
    nombre: !v.nombre.trim()
      ? 'El nombre es obligatorio.'
      : v.nombre.length > 50
        ? 'Máximo 50 caracteres.'
        : '',
    apellidos: !v.apellidos.trim()
      ? 'Los apellidos son obligatorios.'
      : v.apellidos.length > 100
        ? 'Máximo 100 caracteres.'
        : '',
    correo: validarCorreo(v.correo),
    clave: esAdmin && !v.clave ? '' : validarClave(v.clave),
    region: v.region ? '' : 'Selecciona una región.',
    comuna: v.comuna ? '' : 'Selecciona una comuna.',
    direccion: !v.direccion.trim()
      ? 'La dirección es obligatoria.'
      : v.direccion.length > 300
        ? 'Máximo 300 caracteres.'
        : '',
  });
}
