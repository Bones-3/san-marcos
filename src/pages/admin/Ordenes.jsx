import { useState } from 'react';
import { Table, Button, Badge, Form, Row, Col, Card } from 'react-bootstrap';
import { obtenerProductos, guardarProductos } from '../../data/productos';
import { obtenerOrdenes, guardarOrdenes } from '../../util/ordenes';

const COLOR_ESTADO = { Pendiente: 'warning', Recibida: 'success', Cancelada: 'secondary' };

export default function Ordenes() {
  const [productos, setProductos] = useState(obtenerProductos());
  const [ordenes, setOrdenes] = useState(obtenerOrdenes());
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [error, setError] = useState('');

  function actualizarOrdenes(nuevaLista) {
    guardarOrdenes(nuevaLista);
    setOrdenes(nuevaLista);
  }

  function crearOrden(e) {
    e.preventDefault();
    if (!productoId || Number(cantidad) < 1) {
      setError('Selecciona un producto y una cantidad mayor a 0.');
      return;
    }
    const producto = productos.find((p) => p.id === Number(productoId));
    const nuevaOrden = {
      id: Date.now(),
      productoId: producto.id,
      nombre: producto.nombre,
      cantidad: Number(cantidad),
      fecha: new Date().toLocaleDateString('es-CL'),
      estado: 'Pendiente',
    };
    actualizarOrdenes([nuevaOrden, ...ordenes]);
    setProductoId('');
    setCantidad('');
    setError('');
  }

  function recibir(orden) {
    const nuevosProductos = productos.map((p) =>
      p.id === orden.productoId ? { ...p, stock: p.stock + orden.cantidad } : p
    );
    guardarProductos(nuevosProductos);
    setProductos(nuevosProductos);
    actualizarOrdenes(ordenes.map((o) => (o.id === orden.id ? { ...o, estado: 'Recibida' } : o)));
  }

  function cancelar(id) {
    actualizarOrdenes(ordenes.map((o) => (o.id === id ? { ...o, estado: 'Cancelada' } : o)));
  }

  const stockCritico = productos.filter((p) => p.stock <= p.stockCritico);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Órdenes de reposición</h1>
          <p>Solicita ingreso de stock y registra las recepciones.</p>
        </div>
      </div>

      <Card body className="mb-4 admin-card">
        <Form onSubmit={crearOrden}>
          <Row className="g-3 align-items-end">
            <Col md={6}>
              <Form.Label>Producto</Form.Label>
              <Form.Select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                <option value="">Selecciona...</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} (stock: {p.stock})
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            </Col>
            <Col md={3}>
              <Button type="submit" className="w-100">Solicitar</Button>
            </Col>
          </Row>
          {error && <p className="text-danger mt-3 mb-0">{error}</p>}
        </Form>
      </Card>

      {stockCritico.length > 0 && (
        <p className="admin-alert-soft">
          Productos con stock crítico: {stockCritico.map((p) => p.nombre).join(', ')}
        </p>
      )}

      {ordenes.length === 0 ? (
        <p className="admin-empty">Aún no hay órdenes de reposición.</p>
      ) : (
        <div className="admin-table-wrap">
          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <td>{o.fecha}</td>
                  <td>{o.nombre}</td>
                  <td>{o.cantidad}</td>
                  <td><Badge bg={COLOR_ESTADO[o.estado]}>{o.estado}</Badge></td>
                  <td>
                    {o.estado === 'Pendiente' && (
                      <div className="d-flex gap-2">
                        <Button variant="success" size="sm" onClick={() => recibir(o)}>Recibir</Button>
                        <Button variant="outline-secondary" size="sm" onClick={() => cancelar(o.id)}>Cancelar</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
