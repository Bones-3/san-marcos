import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const SERVICIOS = [
  'Consulta general',
  'Vacunación',
  'Cirugía menor',
  'Desparasitación',
  'Control de peso',
];

export default function Nosotros() {
  return (
    <Container className="py-5" style={{ maxWidth: 820 }}>
      <h1>Sobre Veterinaria San Marcos</h1>
      <p>
        Fundada en 2009 en Santiago, Región Metropolitana, Veterinaria San Marcos
        nació con un objetivo simple: entregar atención cercana y profesional a las
        mascotas de la zona.
      </p>
      <p>
        Hoy contamos con 3 médicos veterinarios, 1 técnico veterinario y 1
        recepcionista, atendiendo en promedio 25 pacientes al día entre perros,
        gatos, conejos y aves.
      </p>
      <h2 className="h4 mt-4">Nuestros servicios</h2>
      <ListGroup>
        {SERVICIOS.map((s) => (
          <ListGroup.Item key={s}>{s}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
