import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Campo from '../../components/client/Campo';
import SelectRegionComuna from '../../components/client/SelectRegionComuna';
import { validarRegistroUsuario } from '../../util/validaciones';
import { obtenerUsuarios, guardarUsuarios } from '../../util/usuarios';

const INICIAL = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
};

export default function Registro() {
  const [valores, setValores] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [ok, setOk] = useState(false);

  const actualizar = (campo, valor) => setValores((v) => ({ ...v, [campo]: valor }));

  function enviar(e) {
    e.preventDefault();
    const errs = validarRegistroUsuario(valores, false);
    const usuarios = obtenerUsuarios();
    const run = valores.run.trim().toUpperCase();
    const correo = valores.correo.trim().toLowerCase();

    if (!errs.run && usuarios.some((u) => u.run === run)) {
      errs.run = 'Este RUN ya está registrado.';
    }
    if (!errs.correo && usuarios.some((u) => u.correo.toLowerCase() === correo)) {
      errs.correo = 'Este correo ya está registrado.';
    }

    setErrores(errs);
    if (Object.keys(errs).length > 0) {
      setOk(false);
      return;
    }

    // La contraseña no se guarda: la autenticación real llegará con el backend.
    usuarios.push({
      run,
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo,
      fechaNacimiento: valores.fechaNacimiento,
      tipoUsuario: 'Cliente',
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    });
    guardarUsuarios(usuarios);
    setValores(INICIAL);
    setOk(true);
  }

  return (
    <Container className="py-5" style={{ maxWidth: 720 }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="h3 text-center mb-4">Crear cuenta</h1>
          <form className="row" noValidate onSubmit={enviar}>
            <Campo htmlFor="run" label="RUN (sin puntos ni guion)" error={errores.run} className="col-md-6 mb-3">
              <input type="text" id="run" maxLength="9" placeholder="190110222"
                value={valores.run} onChange={(e) => actualizar('run', e.target.value)} />
            </Campo>
            <Campo htmlFor="fechaNacimiento" label="Fecha de nacimiento (opcional)" className="col-md-6 mb-3">
              <input type="date" id="fechaNacimiento" value={valores.fechaNacimiento}
                onChange={(e) => actualizar('fechaNacimiento', e.target.value)} />
            </Campo>
            <Campo htmlFor="nombre" label="Nombre" error={errores.nombre} className="col-md-6 mb-3">
              <input type="text" id="nombre" maxLength="50" value={valores.nombre}
                onChange={(e) => actualizar('nombre', e.target.value)} />
            </Campo>
            <Campo htmlFor="apellidos" label="Apellidos" error={errores.apellidos} className="col-md-6 mb-3">
              <input type="text" id="apellidos" maxLength="100" value={valores.apellidos}
                onChange={(e) => actualizar('apellidos', e.target.value)} />
            </Campo>
            <Campo htmlFor="correo" label="Correo electrónico" error={errores.correo} className="col-md-6 mb-3">
              <input type="email" id="correo" maxLength="100" placeholder="tucorreo@duoc.cl"
                value={valores.correo} onChange={(e) => actualizar('correo', e.target.value)} />
            </Campo>
            <Campo htmlFor="clave" label="Contraseña" error={errores.clave} className="col-md-6 mb-3">
              <input type="password" id="clave" maxLength="10" placeholder="Entre 4 y 10 caracteres"
                value={valores.clave} onChange={(e) => actualizar('clave', e.target.value)} />
            </Campo>
            <SelectRegionComuna valores={valores} errores={errores} actualizar={actualizar} />
            <Campo htmlFor="direccion" label="Dirección" error={errores.direccion} className="col-12 mb-3">
              <input type="text" id="direccion" maxLength="300" value={valores.direccion}
                onChange={(e) => actualizar('direccion', e.target.value)} />
            </Campo>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
              {ok && <Alert variant="success" className="mt-3 mb-0">Cuenta creada correctamente.</Alert>}
            </div>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
