import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { recetaService } from '../services/recetaService';

function RecetaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await recetaService.getById(id);
        setReceta(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const eliminar = async () => {
    if (!window.confirm('¿Eliminar receta?')) return;
    try {
      await recetaService.remove(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container py-5 text-center"><div className="spinner-border" /></div>;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;
  if (!receta) return null;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <h1>{receta.nombre}</h1>
        <div className="d-flex gap-2">
          <Link className="btn btn-warning" to={`/editar/${receta._id}`}>Editar</Link>
          <button className="btn btn-danger" onClick={eliminar}>Eliminar</button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-12">
          <p className="lead">{receta.descripcion}</p>
          <ul className="list-group mb-3">
            <li className="list-group-item">📂 Categorías: {Array.isArray(receta.categorias) ? receta.categorias.join(', ') : ''}</li>
            <li className="list-group-item">⭐ Puntuación: {receta.valoracion?.puntuacion ?? 0}</li>
            <li className="list-group-item">🗳️ Votos: {receta.valoracion?.votos ?? 0}</li>
          </ul>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-md-6">
          <h5>Ingredientes</h5>
          <div className="card card-body">{receta.ingredientes}</div>
        </div>
        <div className="col-md-6">
          <h5>Instrucciones</h5>
          <div className="card card-body">{receta.instrucciones}</div>
        </div>
      </div>
    </div>
  );
}

export default RecetaDetail;
