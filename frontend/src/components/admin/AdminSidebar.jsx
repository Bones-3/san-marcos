import { NavLink, useNavigate } from "react-router-dom";
import { cerrarSesionAdmin } from "../../util/auth";
import AdminAvatar from "../../assets/logo/person.svg";
import ReportesIcon from "../../assets/logo/graph-up.svg";
import UsuariosIcon from "../../assets/logo/people.svg";
import CategoriasIcon from "../../assets/logo/list-ul.svg";
import ProductosIcon from "../../assets/logo/basket3.svg";
import OrdenesIcon from "../../assets/logo/clipboard2.svg";
import DashboardIcon from "../../assets/logo/house.svg";

const NAV_ITEMS = [
  { to: "/admin", end: true, label: "Dashboard", icon: DashboardIcon },
  { to: "/admin/ordenes", label: "Órdenes", icon: OrdenesIcon },
  { to: "/admin/inventario", label: "Inventario", icon: ProductosIcon },
  { to: "/admin/categorias", label: "Categorías", icon: CategoriasIcon },
  { to: "/admin/usuarios", label: "Usuarios", icon: UsuariosIcon },
  { to: "/admin/reportes", label: "Reportes", icon: ReportesIcon },
];

export const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        cerrarSesionAdmin();
        navigate('/login-admin', { replace: true });
    };

    return (
        <aside className="admin-sidebar d-flex flex-column flex-shrink-0">
            <NavLink
                to="/admin"
                className="admin-sidebar__brand d-flex align-items-center text-decoration-none"
            >
                <span className="admin-sidebar__mark" aria-hidden="true">SM</span>
                <span className="admin-sidebar__brand-copy">
                    <strong>San Marcos</strong>
                    <small>Administración</small>
                </span>
            </NavLink>

            <hr className="admin-sidebar__divider" />

            <ul className="nav nav-pills flex-column mb-auto">
                {NAV_ITEMS.map((item) => (
                    <li className="nav-item mb-1" key={item.to}>
                        <NavLink
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `admin-nav-link nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                            }
                        >
                            <img src={item.icon} alt="" width="18" height="18" />
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="admin-sidebar__user d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2">
                    <span className="admin-sidebar__avatar">
                        <img src={AdminAvatar} alt="" />
                    </span>
                    <div className="d-flex flex-column">
                        <small className="fw-semibold">Admin User</small>
                        <span className="admin-sidebar__role">Administrador</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="btn admin-logout-btn w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                >
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
};
