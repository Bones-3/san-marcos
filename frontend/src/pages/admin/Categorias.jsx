import { Table } from 'react-bootstrap';
import { obtenerProductos } from '../../data/productos';

export default function Categorias() {
  const productos = obtenerProductos();
  const categorias = [...new Set(productos.map((p) => p.categoria))];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Categorías</h1>
          <p>Distribución de productos por categoría.</p>
        </div>
      </div>
      <div className="admin-table-wrap">
      <Table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Cantidad de productos</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c}>
              <td>{c}</td>
              <td>{productos.filter((p) => p.categoria === c).length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
