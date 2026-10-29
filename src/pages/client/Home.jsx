import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import GrillaProductos from '../../components/client/GrillaProductos';
import { obtenerProductos } from '../../data/productos';

export default function Home() {
  const productos = obtenerProductos();

  return (
    <>
      <section className="bg-primary-subtle py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <h1 className="display-5 fw-bold">
                Todo lo que tu mascota necesita, con respaldo veterinario
              </h1>
              <p className="lead">
                Alimento, higiene, salud y accesorios seleccionados por el equipo de
                Veterinaria San Marcos, en Santiago desde 2009.
              </p>
              <Link className="btn btn-primary btn-lg" to="/productos">
                Ver productos
              </Link>
            </Col>
            <Col lg={5}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title as="h2" className="h5">¿Ya tienes hora agendada?</Card.Title>
                  <Card.Text>
                    El módulo de citas en línea llegará en la próxima entrega del
                    proyecto. Por ahora, puedes conocer nuestra tienda y contactarnos.
                  </Card.Text>
                  <Link className="btn btn-outline-primary" to="/contacto">
                    Contáctanos
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="text-center mb-4">
            <h2>Productos destacados</h2>
            <p className="text-body-secondary">
              Una selección de lo más pedido por dueños de perros y gatos.
            </p>
          </div>
          <GrillaProductos productos={productos} limite={4} />
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-outline-primary">
              Ver todo el catálogo
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
