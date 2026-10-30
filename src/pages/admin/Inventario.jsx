import { useState } from 'react';
import { Table, Button, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { obtenerProductos, guardarProductos } from '../../data/productos';
import { formatoCLP } from '../../util/formato';

const CATEGORIAS = ['Alimento', 'Accesorios', 'Higiene', 'Salud', 'Juguetes'];

const FORMULARIO_VACIO = {
  codigo: '',
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  stockCritico: '',
};

function validarProducto(datos) {
  const errores = {};
  if (datos.codigo.trim().length < 3) errores.codigo = 'Mínimo 3 caracteres.';
  if (!datos.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  if (!datos.categoria) errores.categoria = 'Selecciona una categoría.';
  if (datos.precio === '' || Number(datos.precio) < 0) errores.precio = 'Debe ser 0 o mayor.';
  if (datos.stock === '' || !Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0) {
    errores.stock = 'Debe ser un entero 0 o mayor.';
  }
  return errores;
}

export default function Inventario() {
  const [productos, setProductos] = useState(obtenerProductos());
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});

  const productosFiltrados = productos.filter((p) =>
    String(p.nombre || '').toLowerCase().includes(busqueda.toLowerCase()) ||
    String(p.codigo || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  function actualizarCampo(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  }

  function abrirNuevo() {
    setEditandoId(null);
    setFormulario(FORMULARIO_VACIO);
    setErrores({});
    setMostrarModal(true);
  }

  function abrirEditar(producto) {
    setEditandoId(producto.id);
    setFormulario({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      stock: producto.stock,
      stockCritico: producto.stockCritico,
    });
    setErrores({});
    setMostrarModal(true);
  }

  function guardar(e) {
    e.preventDefault();
    const erroresEncontrados = validarProducto(formulario);
    setErrores(erroresEncontrados);
    if (Object.keys(erroresEncontrados).length > 0) return;

    const datos = {
      ...formulario,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      stockCritico: Number(formulario.stockCritico || 0),
    };

    let nuevaLista;
    if (editandoId) {
      nuevaLista = productos.map((p) => (p.id === editandoId ? { ...p, ...datos } : p));
    } else {
      const nuevoId = productos.length ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
      nuevaLista = [...productos, { id: nuevoId, ...datos, descripcion: '', imagen: '' }];
    }

    guardarProductos(nuevaLista);
    setProductos(nuevaLista);
    setMostrarModal(false);
  }

  function cambiarStock(id, cantidad) {
    const nuevaLista = productos.map((p) =>
      p.id === id ? { ...p, stock: Math.max(0, p.stock + cantidad) } : p
    );
    guardarProductos(nuevaLista);
    setProductos(nuevaLista);
  }

  function eliminar(id) {
    const nuevaLista = productos.filter((p) => p.id !== id);
    guardarProductos(nuevaLista);
    setProductos(nuevaLista);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Inventario</h1>
          <p>Catálogo, stock y umbrales críticos.</p>
        </div>
        <Button onClick={abrirNuevo}>+ Nuevo producto</Button>
      </div>

      <Form.Control
        className="mb-3 admin-search"
        placeholder="Buscar por nombre o código..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="admin-table-wrap">
      <Table hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{formatoCLP(p.precio)}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button variant="outline-secondary" size="sm" onClick={() => cambiarStock(p.id, -1)}>−</Button>
                  <span className="fw-bold">{p.stock}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => cambiarStock(p.id, 1)}>+</Button>
                  {p.stock <= p.stockCritico && <Badge bg="danger">Stock crítico</Badge>}
                </div>
              </td>
              <td className="d-flex gap-2">
                <Button variant="outline-primary" size="sm" onClick={() => abrirEditar(p)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => eliminar(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Form onSubmit={guardar} noValidate>
          <Modal.Header closeButton>
            <Modal.Title>{editandoId ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control name="codigo" value={formulario.codigo} onChange={actualizarCampo} isInvalid={!!errores.codigo} />
              <Form.Control.Feedback type="invalid">{errores.codigo}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={formulario.nombre} onChange={actualizarCampo} isInvalid={!!errores.nombre} />
              <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categoria" value={formulario.categoria} onChange={actualizarCampo} isInvalid={!!errores.categoria}>
                <option value="">Selecciona...</option>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control type="number" name="precio" value={formulario.precio} onChange={actualizarCampo} isInvalid={!!errores.precio} />
                  <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" name="stock" value={formulario.stock} onChange={actualizarCampo} isInvalid={!!errores.stock} />
                  <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Stock crítico</Form.Label>
                  <Form.Control type="number" name="stockCritico" value={formulario.stockCritico} onChange={actualizarCampo} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
