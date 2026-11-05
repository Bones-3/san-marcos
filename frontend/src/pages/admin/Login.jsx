import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { estaAutenticado, guardarSesionAdmin } from '../../util/auth';
import '../../styles/admin-theme.css';

const ADMIN_CREDENTIALS = {
  email: 'admin@veterinaria.com',
  password: 'admin123',
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.desde?.pathname || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (estaAutenticado()) {
      navigate(destino, { replace: true });
    }
  }, [navigate, destino]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    const esValido =
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password;

    if (!esValido) {
      setCargando(false);
      setError('Usuario o contraseña incorrectos.');
      return;
    }

    guardarSesionAdmin(ADMIN_CREDENTIALS.email);
    navigate(destino, { replace: true });
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__header">
          <i className="bi bi-shield-lock-fill fs-2 admin-login__logo"></i>
          <h1 className="admin-login__title">Panel Administrador</h1>
          <p className="admin-login__subtitle">Veterinaria San Marcos</p>
        </div>

        {error && (
          <div className="admin-login__error mb-3" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label admin-login__label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="form-control admin-login__input"
            placeholder="admin@veterinaria.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label admin-login__label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-control admin-login__input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn admin-login__submit w-100 py-2"
          disabled={cargando}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Iniciar sesión
        </button>

        <p className="admin-login__hint">
          Acceso de prueba: <code>admin@veterinaria.com</code> / <code>admin123</code>
        </p>
      </form>
    </div>
  );
}