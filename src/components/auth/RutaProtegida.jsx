import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { estaAutenticado } from '../../util/auth';

/**
 * Protege un grupo de rutas: si no hay sesión de administrador,
 * redirige a /login-admin guardando la ruta que se intentó abrir.
 */
export const RutaProtegida = ({ redirigirA = '/login-admin' }) => {
  const location = useLocation();

  if (!estaAutenticado()) {
    return <Navigate to={redirigirA} replace state={{ desde: location }} />;
  }

  return <Outlet />;
};