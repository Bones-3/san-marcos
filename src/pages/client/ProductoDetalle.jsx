import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { obtenerProductos } from '../../data/productos';
import { formatoCLP } from '../../util/formato';
import { agregarAlCarrito } from '../../util/carrito';
import { urlImagen } from '../../util/imagenes';

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = obtenerProductos().find((p) => p.id === Number(id));
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (!producto) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Producto no encontrado. <Link to="/productos">Volver al catálogo</Link>
        </Alert>
      </Container>
    );
  }

  function manejarAgregar() {
    const cant = Math.min(Math.max(1, Number(cantidad) || 1), producto.stock);
    agregarAlCarrito(producto.id, cant, producto.stock);
    setCantidad(cant);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  }

  return (
    <Container className="py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>
      <Row className="g-4 align-items-start">
        <Col md={6}>
          <img src={urlImagen(producto.imagen)} alt={producto.nombre} className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6}>
          <span className="badge text-bg-secondary mb-2">{producto.categoria}</span>
          <h1 className="h2">{producto.nombre}</h1>
          <p className="fs-4 fw-bold">{formatoCLP(producto.precio)}</p>
          <p>{producto.descripcion}</p>
          <p className="text-body-secondary small">
            Código: {producto.codigo} — Stock disponible: {producto.stock}
          </p>
          <div className="mb-3" style={{ maxWidth: 160 }}>
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              className="form-control"
              value={cantidad}
              min="1"
              max={producto.stock}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <Button
            variant={agregado ? 'success' : 'primary'}
            onClick={manejarAgregar}
            disabled={producto.stock < 1}
          >
            {agregado ? 'Añadido ✓' : 'Añadir al carrito'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
