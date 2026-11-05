import { BrowserRouter, Routes, Route} from 'react-router-dom';
/* imports Client*/
import { ClientLayout } from './layouts/ClientLayout.jsx';
import Home from './pages/client/Home.jsx';
import Productos from './pages/client/Productos.jsx';
import Blog from './pages/client/Blogs.jsx';
import Nosotros from './pages/client/Nosotros.jsx';
import Contacto from './pages/client/Contacto.jsx';
import Registro from './pages/client/Registro.jsx';
import ProductoDetalle from './pages/client/ProductoDetalle.jsx';
import Carrito from './pages/client/Carrito.jsx';
import BlogDetalle from './pages/client/BlogDetalle.jsx';
import Login from './pages/client/Login.jsx';

/* imports Admin */
import { AdminLayout } from './layouts/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Ordenes from './pages/admin/Ordenes.jsx';
import Inventario from './pages/admin/Inventario.jsx';
import Categorias from './pages/admin/Categorias.jsx';
import Usuarios from './pages/admin/Usuarios.jsx';
import Reportes from './pages/admin/Reportes.jsx';
import LoginAdmin from './pages/admin/Login.jsx';
import { RutaProtegida } from './components/auth/RutaProtegida.jsx';
import './App.css';

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route element = {<ClientLayout />}>
          <Route index element = {<Home />}/>
          <Route path = "/productos" element = {<Productos />}/>
          <Route path = "/blog" element = {<Blog />}/>
          <Route path = "/nosotros" element = {<Nosotros />}/>
          <Route path = "/contacto" element = {<Contacto />}/>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/registro" element = {<Registro />}/>
          <Route path = "/carrito" element = {<Carrito />}/>
          <Route path = "productos/:id" element = {<ProductoDetalle />}/>
          <Route path = "blog/:id" element = {<BlogDetalle />}/>
        </Route>

        {/* Ruta de inicio de sesión del administrador */}
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Ruta del panel con el Layout principal (Sidebar + Header) */}
        <Route element={<RutaProtegida />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Al entrar a "/admin" muestra directamente el Dashboard */}
          <Route index element={<Dashboard />} />
          {/* Ruta explícita /admin/dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          {/* Ruta explícita /admin/orden */}
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="categorias" element={<Categorias />} />
          {/*  Al entrar a "/admin/usuarios" muestra la página de usuarios */}
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
