import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-auto pt-5 pb-3">
      <Container>
        <Row className="g-4">
          <Col md={5}>
            <h5>Veterinaria San Marcos</h5>
            <p className="text-secondary mb-0">
              Santiago, Región Metropolitana.
              <br />
              Atención de mascotas desde 2009.
            </p>
          </Col>
          <Col sm={6} md={3}>
            <h6>Navegación</h6>
            <ul className="list-unstyled mb-0">
              <li><Link className="link-light link-opacity-75" to="/productos">Productos</Link></li>
              <li><Link className="link-light link-opacity-75" to="/nosotros">Nosotros</Link></li>
              <li><Link className="link-light link-opacity-75" to="/contacto">Contáctanos</Link></li>
              <li><Link className="link-light link-opacity-75" to="/blog">Blog</Link></li>
            </ul>
          </Col>
          <Col sm={6} md={4}>
            <h6>Contacto</h6>
            <p className="text-secondary mb-0">
              contacto@veterinariasanmarcos.cl
              <br />
              +56 9 5486 5698
            </p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <small className="d-block text-center text-secondary">
          &copy; {anio} Veterinaria San Marcos — Derechos reservados
        </small>
      </Container>
    </footer>
  );
}
