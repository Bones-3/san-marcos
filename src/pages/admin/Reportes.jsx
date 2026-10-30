import { Row, Col, Card, Table, ProgressBar } from 'react-bootstrap';
import { obtenerProductos } from '../../data/productos';
import { obtenerOrdenes } from '../../util/ordenes';
import { formatoCLP } from '../../util/formato';

export default function Reportes() {
  const productos = obtenerProductos();
  const ordenes = obtenerOrdenes();

  const unidadesTotales = productos.reduce((total, p) => total + p.stock, 0);
  const valorTotal = productos.reduce((total, p) => total + p.precio * p.stock, 0);
  const stockCritico = productos.filter((p) => p.stock <= p.stockCritico);

  // Resumen por categoría
  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const porCategoria = categorias.map((c) => {
    const delaCategoria = productos.filter((p) => p.categoria === c);
    const valor = delaCategoria.reduce((total, p) => total + p.precio * p.stock, 0);
    return {
      nombre: c,
      productos: delaCategoria.length,
      unidades: delaCategoria.reduce((total, p) => total + p.stock, 0),
      valor,
      porcentaje: valorTotal ? Math.round((valor / valorTotal) * 100) : 0,
    };
  });

  // Los 3 productos con más valor en bodega
  const top = [...productos]
    .sort((a, b) => b.precio * b.stock - a.precio * a.stock)
    .slice(0, 3);

  const pendientes = ordenes.filter((o) => o.estado === 'Pendiente').length;
  const unidadesRecibidas = ordenes
    .filter((o) => o.estado === 'Recibida')
    .reduce((total, o) => total + o.cantidad, 0);

  const tarjetas = [
    { titulo: 'Productos', valor: productos.length },
    { titulo: 'Unidades en bodega', valor: unidadesTotales },
    { titulo: 'Valor del inventario', valor: formatoCLP(valorTotal) },
    { titulo: 'Stock crítico', valor: stockCritico.length },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Reportes</h1>
          <p>Valor de bodega, categorías y reposiciones.</p>
        </div>
      </div>

      <Row xs={1} md={2} lg={4} className="g-3 mb-4">
        {tarjetas.map((t) => (
          <Col key={t.titulo}>
            <div className="admin-kpi">
              <small>{t.titulo}</small>
              <p className="admin-kpi__value fs-3">{t.valor}</p>
            </div>
          </Col>
        ))}
      </Row>

      <h5 className="mb-3">Inventario por categoría</h5>
      <div className="admin-table-wrap mb-4">
      <Table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Productos</th>
            <th>Unidades</th>
            <th>Valor</th>
            <th style={{ width: '30%' }}>% del valor total</th>
          </tr>
        </thead>
        <tbody>
          {porCategoria.map((c) => (
            <tr key={c.nombre}>
              <td>{c.nombre}</td>
              <td>{c.productos}</td>
              <td>{c.unidades}</td>
              <td>{formatoCLP(c.valor)}</td>
              <td><ProgressBar now={c.porcentaje} label={`${c.porcentaje}%`} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

      <Row className="g-3">
        <Col md={6}>
          <Card>
            <Card.Header>Top 3 productos con más valor en bodega</Card.Header>
            <Table className="mb-0">
              <tbody>
                {top.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}. {p.nombre}</td>
                    <td className="text-end">{formatoCLP(p.precio * p.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Reposiciones</Card.Header>
            <Table className="mb-0">
              <tbody>
                <tr><td>Órdenes pendientes</td><td className="text-end">{pendientes}</td></tr>
                <tr><td>Unidades recibidas</td><td className="text-end">{unidadesRecibidas}</td></tr>
                <tr>
                  <td>Productos a reponer</td>
                  <td className="text-end">{stockCritico.map((p) => p.nombre).join(', ') || 'Ninguno'}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
