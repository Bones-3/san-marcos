export default function Dashboard() {
  return (
    <>
      <h1>Panel de administración</h1>
      <p>
        Bienvenido/a. Desde aquí puedes gestionar el catálogo de productos y los
        usuarios del sistema.
      </p>
      <p>
        <small>
          Nota: en esta entrega el acceso y los datos se simulan con{" "}
          <code>localStorage</code>. La autenticación real con roles (Administrador
          / Vendedor / Cliente) se implementará junto al backend.
        </small>
      </p>
    </>
  );
}