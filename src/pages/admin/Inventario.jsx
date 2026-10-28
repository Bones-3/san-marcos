import { useState } from "react";
import person from "../../assets/logo/person.svg";

export default function Productos() {
  const [cargando, setCargando] = useState(true);
  return (
    <>
    <div className="card">
      <img src={person} className="card-img-top" alt="..."           
          onLoad={() => setCargando(false)}
          onError={() => setCargando(false)}/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        <a href="#" className="btn admin-btn-accent">Go somewhere</a>
      </div>
    </div>
    {/* Placeholder card for loading state */}
    {cargando && (
        <div className="card" aria-hidden="true">
          {/* Skeleton */}
          <div className="card-body">
            <h5 className="card-title placeholder-wave">
              <span className="placeholder col-6"></span>
            </h5>

            <p className="card-text placeholder-wave">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
