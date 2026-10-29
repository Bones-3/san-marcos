import { NavLink, useNavigate } from "react-router-dom";
import { cerrarSesionAdmin } from "../../util/auth";
import AdminAvatar from "../../assets/logo/person.svg"; // Asegúrate de tener este avatar en tu carpeta de assets
import ReportesIcon from "../../assets/logo/graph-up.svg"; // Asegúrate de tener este icono en tu carpeta de assets
import UsuariosIcon from "../../assets/logo/people.svg"; // Asegúrate de tener este icono en tu carpeta de assets
import CategoriasIcon from "../../assets/logo/list-ul.svg"; // Asegúrate de tener este icono en tu carpeta de assets
import ProductosIcon from "../../assets/logo/basket3.svg"; // Asegúrate de tener este icono en tu carpeta de assets
import OrdenesIcon from "../../assets/logo/clipboard2.svg"; // Asegúrate de tener este icono en tu carpeta de assets
import DashboardIcon from "../../assets/logo/house.svg"; // Asegúrate de tener este icono en tu carpeta de assets

export const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        cerrarSesionAdmin();
        navigate('/login-admin', { replace: true });
    };

    return (
        <aside
            className="admin-sidebar d-flex flex-column flex-shrink-0 p-3"
        >
            {/* Logo / Nombre del Panel */}
            <NavLink
                to="/admin"
                className="admin-sidebar__brand d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
            >
                <i className="bi bi-shield-lock-fill fs-4 me-2 admin-sidebar__brand-icon"></i>
                <span className="fs-5 fw-bold">Panel Administrador</span>
            </NavLink>

            <hr className="admin-sidebar__divider" />

            {/* Menú de Navegación */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-speedometer2"></i>
                        <img src={DashboardIcon} alt="Dashboard" width="20" height="20" />
                        Dashboard
                    </NavLink>
                </li>

                <li className="nav-item mb-1">
                    <NavLink
                        to="/admin/ordenes"
                        className={({ isActive }) =>
                            `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-box-seam"></i>
                        <img src={OrdenesIcon} alt="Ordenes" width="20" height="20" />
                        Ordenes
                    </NavLink>
                </li>

                <li className="nav-item mb-1">
                    <NavLink
                        to="/admin/productos"
                        className={({ isActive }) =>
                            `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-box-seam"></i>
                        <img src={ProductosIcon} alt="Productos" width="20" height="20" />
                        Productos
                    </NavLink>
                </li>

                <li className="nav-item mb-1">
                    <NavLink
                        to="/admin/categorias"
                        className={({ isActive }) =>
                            `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-cart-check"></i>
                        <img src={CategoriasIcon} alt="Categorias" width="20" height="20" />
                        Categorias
                    </NavLink>
                </li>

                <li className="nav-item mb-1">
                    <NavLink
                        to="/admin/usuarios"
                        className={({ isActive }) =>
                            `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-cart-check"></i>
                        <img src={UsuariosIcon} alt="Usuarios" width="20" height="20" />
                        Usuarios
                    </NavLink>
                </li>

                <li className="nav-item mb-1">
                    <NavLink
                        to="/admin/reportes"
                        className={({ isActive }) =>
                            `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-people"></i>
                        <img src={ReportesIcon} alt="Reportes" width="20" height="20" />
                        Reportes
                    </NavLink>
                </li>
            </ul>

            <hr className="admin-sidebar__divider" />

            {/* Perfil del Administrador y Cierre de Sesión */}
            <div className="dropdown">
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center">
                        <img
                            src={AdminAvatar}
                            alt="Admin Avatar"
                            className="rounded-circle me-2"
                            width="32"
                            height="32"
                        />
                        <small className="fw-semibold">Admin User</small>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn admin-logout-btn w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-2"
                    >
                        <i className="bi bi-box-arrow-right fs-6"></i>
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};