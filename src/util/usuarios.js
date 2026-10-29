const USUARIOS_KEY = 'vsm_usuarios';

export function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];
  } catch {
    return [];
  }
}

export const guardarUsuarios = (lista) =>
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(lista));
