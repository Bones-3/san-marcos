import Container from 'react-bootstrap/Container';
import GrillaProductos from '../../components/client/GrillaProductos';
import { obtenerProductos } from '../../data/productos';

export default function Productos() {
  const productos = obtenerProductos();

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1>Catálogo de productos</h1>
        <p className="text-body-secondary">
          Alimento, higiene, salud, juguetes y accesorios para tu mascota.
        </p>
      </div>
      <GrillaProductos productos={productos} />
    </Container>
  );
}
