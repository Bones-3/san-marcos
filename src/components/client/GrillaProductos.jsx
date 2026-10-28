import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductoCard from './ProductoCard';

export default function GrillaProductos({ productos, limite }) {
  const visibles = limite ? productos.slice(0, limite) : productos;

  return (
    <Row xs={1} sm={2} lg={4} className="g-4">
      {visibles.map((producto) => (
        <Col key={producto.id}>
          <ProductoCard producto={producto} />
        </Col>
      ))}
    </Row>
  );
}
