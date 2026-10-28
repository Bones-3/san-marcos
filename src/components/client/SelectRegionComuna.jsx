import Campo from './Campo';
import { REGIONES } from '../../data/regiones';

export default function SelectRegionComuna({ valores, errores, actualizar }) {
  const region = REGIONES.find((r) => r.nombre === valores.region);

  function cambiarRegion(nombre) {
    actualizar('region', nombre);
    actualizar('comuna', ''); // la comuna depende de la región
  }

  return (
    <>
      <Campo htmlFor="region" label="Región" error={errores.region} className="col-md-6">
        <select
          id="region"
          value={valores.region}
          onChange={(e) => cambiarRegion(e.target.value)}
        >
          <option value="">Selecciona una región</option>
          {REGIONES.map((r) => (
            <option key={r.nombre} value={r.nombre}>
              {r.nombre}
            </option>
          ))}
        </select>
      </Campo>
      <Campo htmlFor="comuna" label="Comuna" error={errores.comuna} className="col-md-6">
        <select
          id="comuna"
          value={valores.comuna}
          disabled={!region}
          onChange={(e) => actualizar('comuna', e.target.value)}
        >
          <option value="">Selecciona una comuna</option>
          {region?.comunas.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Campo>
    </>
  );
}
