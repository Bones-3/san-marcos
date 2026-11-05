import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { contarCarrito, suscribirCarrito } from '../../util/carrito';
import { useEffect } from 'react';

const ENLACES_NAV = [
  { etiqueta: 'Inicio', to: '/' },
  { etiqueta: 'Productos', to: '/productos' },
  { etiqueta: 'Nosotros', to: '/nosotros' },
  { etiqueta: 'Blog', to: '/blog' },
  { etiqueta: 'Contacto', to: '/contacto' },
];

export default function Header() {
  const [expandido, setExpandido] = useState(false);
  const [cantidad, setCantidad] = useState(contarCarrito);

  useEffect(() => suscribirCarrito(() => setCantidad(contarCarrito())), []);

  const cerrar = () => setExpandido(false);

  return (
    <Navbar
      expand="lg"
      bg="body-tertiary"
      className="border-bottom"
      sticky="top"
      expanded={expandido}
      onToggle={setExpandido}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={cerrar} className="d-flex align-items-center gap-2 fw-bold">
          <img src="/img/logo_navegador.png" alt="" width="32" height="32" />
          Veterinaria San Marcos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navPrincipal" aria-label="Abrir menú" />
        <Navbar.Collapse id="navPrincipal">
          <Nav className="me-auto">
            {ENLACES_NAV.map(({ etiqueta, to }) => (
              <Nav.Link as={NavLink} key={to} to={to} end={to === '/'} onClick={cerrar}>
                {etiqueta}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="align-items-lg-center gap-lg-2">
            <Nav.Link as={NavLink} to="/carrito" onClick={cerrar}>
              Carrito{' '}
              {cantidad > 0 && (
                <Badge bg="primary" pill>
                  {cantidad}
                </Badge>
              )}
            </Nav.Link>
            <Link to="/login" onClick={cerrar} className="btn btn-outline-primary btn-sm">
              Ingresar
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
