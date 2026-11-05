import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Campo from '../../components/client/Campo';
import { validarLogin } from '../../util/validaciones';

const INICIAL = { correo: '', clave: '' };

export default function Login() {
  const [valores, setValores] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [ok, setOk] = useState(false);

  const actualizar = (campo, valor) => setValores((v) => ({ ...v, [campo]: valor }));

  function enviar(e) {
    e.preventDefault();
    const errs = validarLogin(valores);
    setErrores(errs);
    setOk(Object.keys(errs).length === 0);
  }

  return (
    <Container className="py-5" style={{ maxWidth: 460 }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="h3 text-center mb-4">Iniciar sesión</h1>
          <form noValidate onSubmit={enviar}>
            <Campo htmlFor="correo" label="Correo electrónico" error={errores.correo}>
              <input type="email" id="correo" maxLength="100" placeholder="tucorreo@duoc.cl"
                value={valores.correo} onChange={(e) => actualizar('correo', e.target.value)} />
            </Campo>
            <Campo htmlFor="clave" label="Contraseña" error={errores.clave}>
              <input type="password" id="clave" maxLength="10" placeholder="Entre 4 y 10 caracteres"
                value={valores.clave} onChange={(e) => actualizar('clave', e.target.value)} />
            </Campo>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            <p className="text-center mt-3 mb-0">
              ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
            </p>
            {ok && (
              <Alert variant="success" className="mt-3 mb-0">
                Inicio de sesión validado (demo, sin backend aún).
              </Alert>
            )}
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
