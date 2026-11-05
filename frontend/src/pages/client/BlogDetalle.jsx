import { Link, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { ARTICULOS } from '../../data/articulos';

export default function BlogDetalle() {
  const { id } = useParams();
  const articulo = ARTICULOS[id];

  if (!articulo) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Artículo no encontrado. <Link to="/blog">Volver al blog</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: 760 }}>
      <img src={articulo.imagenDetalle} alt={articulo.titulo} className="img-fluid rounded mb-4" />
      <h1>{articulo.titulo}</h1>
      {/* Contenido propio (data/articulos.js); no usar con texto ingresado por usuarios. */}
      <div dangerouslySetInnerHTML={{ __html: articulo.cuerpo }} />
      <Link to="/blog" className="btn btn-outline-primary mt-3">← Volver al blog</Link>
    </Container>
  );
}
