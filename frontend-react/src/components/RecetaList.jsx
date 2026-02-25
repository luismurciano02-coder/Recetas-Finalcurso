import { useEffect, useState } from 'react';
import { recetaService } from '../services/recetaService';
import RecetaCard from './RecetaCard';

function RecetaList() {
  const [recetas, setRecetas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadData = async ({ targetPage = page, targetCategoria = categoria, targetBusqueda = busqueda } = {}) => {
    try {
      setLoading(true);
      setError('');

      const [result, dataCategorias] = await Promise.all([
        recetaService.getPaginated({
          page: targetPage,
          limit,
          categoria: targetCategoria,
          q: targetBusqueda.trim(),
        }),
        recetaService.getCategorias(),
      ]);

      setRecetas(result.status || []);
      setCategorias(dataCategorias);
      setPage(result.pagination?.page || targetPage);
      setTotalPages(result.pagination?.totalPages || 1);
      setTotal(result.pagination?.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData({ targetPage: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aplicarFiltros = () => {
    loadData({ targetPage: 1 });
  };

  const cambiarPagina = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    loadData({ targetPage: nextPage });
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta receta?')) return;
    try {
      setLoading(true);
      setError('');
      await recetaService.remove(id);
      setAlert('Receta eliminada correctamente');
      const targetPage = page > 1 && recetas.length === 1 ? page - 1 : page;
      await loadData({ targetPage });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">Listado de recetas</h1>

      {alert && <div className="alert alert-success">{alert}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-3">
        <div className="card-body row g-2">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Buscar por nombre o descripción"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') aplicarFiltros();
              }}
            />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-outline-primary" onClick={aplicarFiltros}>Aplicar</button>
          </div>
        </div>
      </div>

      {loading && <div className="text-center py-3"><div className="spinner-border" /></div>}

      {!loading && recetas.length === 0 && (
        <div className="alert alert-info">No hay recetas para mostrar.</div>
      )}

      <div className="row g-3">
        {recetas.map((receta) => (
          <div key={receta._id} className="col-md-6 col-lg-4">
            <RecetaCard receta={receta} onDelete={eliminar} />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <small>Total: {total}</small>
        <div className="btn-group">
          <button className="btn btn-outline-secondary" disabled={page <= 1} onClick={() => cambiarPagina(page - 1)}>
            Anterior
          </button>
          <button className="btn btn-outline-secondary" disabled>
            {page} / {totalPages}
          </button>
          <button className="btn btn-outline-secondary" disabled={page >= totalPages} onClick={() => cambiarPagina(page + 1)}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecetaList;
