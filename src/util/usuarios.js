import { USUARIOS_INICIALES } from '../data/usuarios';

const USUARIOS_KEY = 'vsm_usuarios';

export function obtenerUsuarios() {
  const guardados = localStorage.getItem(USUARIOS_KEY);
  if (!guardados) {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(USUARIOS_INICIALES));
    return [...USUARIOS_INICIALES];
  }
  try {
    return JSON.parse(guardados);
  } catch {
    return [];
  }
}

export const guardarUsuarios = (lista) =>
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(lista));
