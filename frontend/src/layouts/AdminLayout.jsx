import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className="admin-shell">
      <AdminSidebar />

      <div className="admin-main flex-grow-1 d-flex flex-column">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar__kicker">Veterinaria San Marcos</p>
            <p className="admin-topbar__title">Panel de administración</p>
          </div>
        </header>
        <main className="admin-content flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
