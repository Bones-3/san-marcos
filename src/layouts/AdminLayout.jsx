import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      {/* Menú lateral fijo a la izquierda */}
      <AdminSidebar />

      {/* Área principal dinámica donde se renderiza cada página del admin */}
      <div className="admin-main flex-grow-1 d-flex flex-column">
        <main className="p-4 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};