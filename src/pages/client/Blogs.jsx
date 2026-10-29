import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ARTICULOS } from '../../data/articulos';

export default function Blogs() {
  const articulos = Object.entries(ARTICULOS);

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1>Blog y datos curiosos</h1>
        <p className="text-body-secondary">
          Consejos y curiosidades sobre el cuidado de tu mascota.
        </p>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {articulos.map(([id, articulo]) => (
          <Col key={id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={articulo.imagen} alt={articulo.titulo} />
              <Card.Body className="d-flex flex-column">
                <Card.Title as="h2" className="h5">{articulo.titulo}</Card.Title>
                <Card.Text>{articulo.resumen}</Card.Text>
                <Link to={`/blog/${id}`} className="btn btn-outline-primary mt-auto align-self-start">
                  Leer más →
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
