import { Link } from 'react-router-dom';

function RecetaCard({ receta, onDelete }) {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{receta.nombre}</h5>
        <p className="card-text text-muted">{receta.descripcion}</p>

        <div className="small mb-3">
          <div>📂 {Array.isArray(receta.categorias) ? receta.categorias.join(', ') : ''}</div>
          <div>⭐ {receta.valoracion?.puntuacion ?? 0} ({receta.valoracion?.votos ?? 0} votos)</div>
        </div>

        <div className="mt-auto d-flex gap-2">
          <Link className="btn btn-sm btn-outline-primary" to={`/receta/${receta._id}`}>Ver</Link>
          <Link className="btn btn-sm btn-outline-warning" to={`/editar/${receta._id}`}>Editar</Link>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(receta._id)}>Borrar</button>
        </div>
      </div>
    </div>
  );
}

export default RecetaCard;
