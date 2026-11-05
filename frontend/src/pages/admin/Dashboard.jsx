import { Link } from 'react-router-dom';
import { Row, Col, Table, Badge } from 'react-bootstrap';
import { obtenerProductos } from '../../data/productos';
import { obtenerUsuarios } from '../../util/usuarios';
import { obtenerOrdenes } from '../../util/ordenes';

export default function Dashboard() {
  const productos = obtenerProductos();
  const usuarios = obtenerUsuarios();
  const ordenes = obtenerOrdenes();

  const stockCritico = productos.filter((p) => p.stock <= p.stockCritico);
  const pendientes = ordenes.filter((o) => o.estado === 'Pendiente');

  const tarjetas = [
    { titulo: 'Productos', valor: productos.length, link: '/admin/inventario', tono: '' },
    { titulo: 'Usuarios', valor: usuarios.length, link: '/admin/usuarios', tono: 'admin-kpi--info' },
    { titulo: 'Stock crítico', valor: stockCritico.length, link: '/admin/inventario', tono: 'admin-kpi--danger' },
    { titulo: 'Órdenes pendientes', valor: pendientes.length, link: '/admin/ordenes', tono: 'admin-kpi--warn' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Resumen de inventario, usuarios y reposiciones.</p>
        </div>
      </div>

      <Row xs={1} md={2} lg={4} className="g-3 mb-4">
        {tarjetas.map((t) => (
          <Col key={t.titulo}>
            <div className={`admin-kpi ${t.tono}`}>
              <small>{t.titulo}</small>
              <p className="admin-kpi__value">{t.valor}</p>
              <Link to={t.link}>Ver detalle</Link>
            </div>
          </Col>
        ))}
      </Row>

      <div className="admin-page-header mb-3">
        <div>
          <h2 className="fs-5 mb-0">Alertas de stock</h2>
          <p>Productos que están en o bajo el umbral crítico.</p>
        </div>
      </div>

      {stockCritico.length === 0 ? (
        <p className="admin-empty">Todos los productos tienen stock suficiente.</p>
      ) : (
        <div className="admin-table-wrap">
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Stock crítico</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stockCritico.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td><Badge bg="danger">{p.stock}</Badge></td>
                  <td>{p.stockCritico}</td>
                  <td><Link to="/admin/ordenes">Solicitar reposición</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
