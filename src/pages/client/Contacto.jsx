import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Campo from '../../components/client/Campo';
import { validarContacto } from '../../util/validaciones';

const INICIAL = { nombre: '', correo: '', comentario: '' };

export default function Contacto() {
  const [valores, setValores] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [ok, setOk] = useState(false);

  const actualizar = (campo, valor) => setValores((v) => ({ ...v, [campo]: valor }));

  function enviar(e) {
    e.preventDefault();
    const errs = validarContacto(valores);
    setErrores(errs);
    const valido = Object.keys(errs).length === 0;
    setOk(valido);
    if (valido) setValores(INICIAL);
  }

  return (
    <Container className="py-5" style={{ maxWidth: 560 }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="h3 text-center mb-4">Contáctanos</h1>
          <form onSubmit={enviar} noValidate>
            <Campo htmlFor="nombre" label="Nombre" error={errores.nombre}>
              <input type="text" id="nombre" maxLength="100" value={valores.nombre}
                onChange={(e) => actualizar('nombre', e.target.value)} />
            </Campo>
            <Campo htmlFor="correo" label="Correo electrónico" error={errores.correo}>
              <input type="email" id="correo" maxLength="100" placeholder="tucorreo@duoc.cl"
                value={valores.correo} onChange={(e) => actualizar('correo', e.target.value)} />
            </Campo>
            <Campo htmlFor="comentario" label="Comentario" error={errores.comentario}>
              <textarea id="comentario" rows="5" maxLength="500" value={valores.comentario}
                onChange={(e) => actualizar('comentario', e.target.value)} />
            </Campo>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
            {ok && (
              <Alert variant="success" className="mt-3 mb-0">
                Mensaje enviado correctamente. ¡Gracias por contactarnos!
              </Alert>
            )}
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
