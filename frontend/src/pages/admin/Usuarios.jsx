import { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { obtenerUsuarios, guardarUsuarios } from '../../util/usuarios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios());
  const [busqueda, setBusqueda] = useState('');

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.apellidos} ${u.correo} ${u.run}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  function eliminar(run) {
    const nuevaLista = usuarios.filter((u) => u.run !== run);
    guardarUsuarios(nuevaLista);
    setUsuarios(nuevaLista);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Usuarios</h1>
          <p>{usuarios.length} usuarios registrados</p>
        </div>
      </div>

      {usuarios.length === 0 ? (
        <p className="admin-empty">Aún no hay usuarios registrados. Se crean desde la página de registro de la tienda.</p>
      ) : (
        <>
          <Form.Control
            className="mb-3 admin-search"
            placeholder="Buscar por nombre, correo o RUN..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div className="admin-table-wrap">
          <Table hover>
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Región / Comuna</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr key={u.run}>
                  <td>{u.run}</td>
                  <td>{u.nombre} {u.apellidos}</td>
                  <td>{u.correo}</td>
                  <td>{u.region} / {u.comuna}</td>
                  <td>{u.tipoUsuario}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => eliminar(u.run)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </>
      )}
    </div>
  );
}
