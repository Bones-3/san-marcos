
import { cloneElement } from 'react';
/**
 * Campo de formulario Bootstrap: label + control + mensaje de error.
 * Agrega automáticamente .form-control / .form-select e .is-invalid.
 */
export default function Campo({ htmlFor, label, error, className = 'mb-3', children }) {
  const base = children.type === 'select' ? 'form-select' : 'form-control';
  const control = cloneElement(children, {
    className: `${base}${error ? ' is-invalid' : ''}`,
  });

  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>
      {control}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}