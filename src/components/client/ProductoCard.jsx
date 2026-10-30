import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { formatoCLP } from '../../util/formato';
import { agregarAlCarrito } from '../../util/carrito';
import { urlImagen } from '../../util/imagenes';

export default function ProductoCard({ producto }) {
  const [agregado, setAgregado] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function manejarAgregar() {
    agregarAlCarrito(producto.id, 1, producto.stock);
    setAgregado(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAgregado(false), 1200);
  }

  return (
    <Card className="h-100 shadow-sm">
      <Link to={`/productos/${producto.id}`} className="ratio ratio-4x3">
        <Card.Img variant="top" src={urlImagen(producto.imagen)} alt={producto.nombre} className="object-fit-cover" />
      </Link>
      <Card.Body className="d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">{producto.categoria}</span>
        <Card.Title as="h3" className="fs-6">
          <Link to={`/productos/${producto.id}`} className="text-decoration-none text-reset">
            {producto.nombre}
          </Link>
        </Card.Title>
        <p className="fw-bold fs-5 mt-auto mb-2">{formatoCLP(producto.precio)}</p>
        <Button variant={agregado ? 'success' : 'primary'} onClick={manejarAgregar} disabled={producto.stock < 1}>
          {producto.stock < 1 ? 'Sin stock' : agregado ? 'Añadido ✓' : 'Añadir al carrito'}
        </Button>
      </Card.Body>
    </Card>
  );
}
