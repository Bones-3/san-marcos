const AUTH_KEY = 'adminAuth';

export const obtenerSesionAdmin = () => {
  try {
    const sesion = JSON.parse(localStorage.getItem(AUTH_KEY));
    return sesion && sesion.email ? sesion : null;
  } catch {
    return null;
  }
};

export const estaAutenticado = () => obtenerSesionAdmin() !== null;

export const guardarSesionAdmin = (email) =>
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, fecha: new Date().toISOString() }));

export const cerrarSesionAdmin = () => localStorage.removeItem(AUTH_KEY);
