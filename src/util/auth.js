const AUTH_KEY = 'adminAuth';

export const estaAutenticado = () => Boolean(localStorage.getItem(AUTH_KEY));

export const guardarSesionAdmin = (email) =>
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, fecha: new Date().toISOString() }));

export const cerrarSesionAdmin = () => localStorage.removeItem(AUTH_KEY);