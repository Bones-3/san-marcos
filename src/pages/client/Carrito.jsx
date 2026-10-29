import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { obtenerProductos } from '../../data/productos';
import {
  obtenerCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  suscribirCarrito,
} from '../../util/carrito';
import { formatoCLP } from '../../util/formato';

export default function Carrito() {
  const [items, setItems] = useState(obtenerCarrito);

  useEffect(() => suscribirCarrito(() => setItems(obtenerCarrito())), []);

  const catalogo = obtenerProductos();
  // Se ignoran ítems cuyo producto ya no existe en el catálogo.
  const lineas = items
    .map((i) => ({ ...i, producto: catalogo.find((p) => p.id === i.id) }))
    .filter((l) => l.producto);
  const total = lineas.reduce((t, l) => t + l.producto.precio * l.cantidad, 0);

  if (lineas.length === 0) {
    return (
      <Container className="py-5">
        <h1 className="mb-4">Carrito de compras</h1>
        <Alert variant="info">
          Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Carrito de compras</h1>
      <div className="table-responsive">
        <Table hover className="align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end">Precio</th>
              <th style={{ width: 120 }}>Cantidad</th>
              <th className="text-end">Subtotal</th>
              <th><span className="visually-hidden">Quitar</span></th>
            </tr>
          </thead>
          <tbody>
            {lineas.map(({ id, cantidad, producto }) => (
              <tr key={id}>
                <td>
                  <Link to={`/productos/${id}`} className="text-decoration-none">
                    {producto.nombre}
                  </Link>
                </td>
                <td className="text-end">{formatoCLP(producto.precio)}</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="1"
                    max={producto.stock}
                    value={cantidad}
                    aria-label={`Cantidad de ${producto.nombre}`}
                    onChange={(e) => cambiarCantidad(id, Number(e.target.value) || 1, producto.stock)}
                  />
                </td>
                <td className="text-end">{formatoCLP(producto.precio * cantidad)}</td>
                <td className="text-end">
                  <Button variant="outline-danger" size="sm" onClick={() => quitarDelCarrito(id)}>
                    Quitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="text-end">Total</th>
              <th className="text-end">{formatoCLP(total)}</th>
              <th></th>
            </tr>
          </tfoot>
        </Table>
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={vaciarCarrito}>Vaciar carrito</Button>
        <Button variant="primary" disabled title="El pago estará disponible en una próxima entrega">
          Continuar con el pago
        </Button>
      </div>
    </Container>
  );
}
