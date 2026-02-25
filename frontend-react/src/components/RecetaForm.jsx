import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recetaService } from '../services/recetaService';

const categorias = ['Española', 'Arroces', 'Tapas', 'Saludable', 'Rápida', 'Postre'];

const initialState = {
  nombre: '',
  descripcion: '',
  ingredientes: '',
  instrucciones: '',
  categorias: [],
  valoracion: {
    puntuacion: 1,
    votos: 1,
  },
};

function RecetaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editMode = Boolean(id);

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!editMode) return;

    const load = async () => {
      try {
        setLoading(true);
        const receta = await recetaService.getById(id);
        setForm({
          ...receta,
          categorias: Array.isArray(receta.categorias) ? receta.categorias : [],
          valoracion: {
            puntuacion: receta.valoracion?.puntuacion ?? 1,
            votos: receta.valoracion?.votos ?? 1,
          },
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [editMode, id]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const touchField = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const toggleCategoria = (value) => {
    setForm((prev) => {
      const existe = prev.categorias.includes(value);
      const nextCategorias = existe
        ? prev.categorias.filter((item) => item !== value)
        : [...prev.categorias, value];

      setFieldErrors((prevErrors) => ({ ...prevErrors, categorias: '' }));
      setTouched((prevTouched) => ({ ...prevTouched, categorias: true }));
      return { ...prev, categorias: nextCategorias };
    });
  };

  const updateValoracion = (field, value) => {
    setForm((prev) => ({
      ...prev,
      valoracion: {
        ...prev.valoracion,
        [field]: value,
      },
    }));
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errores = {};

    if (!form.nombre || !form.nombre.trim()) errores.nombre = 'Este campo es obligatorio';
    else if (form.nombre.trim().length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres';

    if (!form.descripcion || !form.descripcion.trim()) errores.descripcion = 'Este campo es obligatorio';
    else if (form.descripcion.trim().length < 10) errores.descripcion = 'La descripción debe tener al menos 10 caracteres';

    if (!form.ingredientes || !form.ingredientes.trim()) errores.ingredientes = 'Este campo es obligatorio';
    if (!form.instrucciones || !form.instrucciones.trim()) errores.instrucciones = 'Este campo es obligatorio';
    if (!Array.isArray(form.categorias) || !form.categorias.length) errores.categorias = 'Este campo es obligatorio';

    const puntuacion = Number(form.valoracion?.puntuacion);
    const votos = Number(form.valoracion?.votos);
    if (form.valoracion?.puntuacion === '' || form.valoracion?.puntuacion === null || form.valoracion?.puntuacion === undefined) {
      errores.puntuacion = 'Este campo es obligatorio';
    } else if (Number.isNaN(puntuacion) || puntuacion < 0 || puntuacion > 5) {
      errores.puntuacion = 'La puntuación debe estar entre 0 y 5';
    }

    if (form.valoracion?.votos === '' || form.valoracion?.votos === null || form.valoracion?.votos === undefined) {
      errores.votos = 'Este campo es obligatorio';
    } else if (Number.isNaN(votos) || votos < 0) {
      errores.votos = 'Los votos deben ser 0 o mayor';
    }

    return errores;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSubmitted(true);

    const errores = validate();
    setFieldErrors(errores);
    setTouched({
      nombre: true,
      descripcion: true,
      ingredientes: true,
      instrucciones: true,
      categorias: true,
      puntuacion: true,
      votos: true,
    });

    if (Object.keys(errores).length > 0) {
      setError('Revisa los campos obligatorios del formulario');
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      ingredientes: form.ingredientes.trim(),
      instrucciones: form.instrucciones.trim(),
      categorias: form.categorias,
      valoracion: {
        puntuacion: Number(form.valoracion.puntuacion),
        votos: Number(form.valoracion.votos),
      },
    };

    try {
      setLoading(true);
      if (editMode) {
        await recetaService.update(id, payload);
        setSuccess('Receta actualizada correctamente');
      } else {
        await recetaService.create(payload);
        setSuccess('Receta creada correctamente');
      }

      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">{editMode ? 'Editar receta' : 'Nueva receta'}</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} noValidate className="card card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre <span className="text-danger">*</span></label>
            <input
              className={`form-control ${(fieldErrors.nombre && (submitted || touched.nombre)) ? 'is-invalid' : ''}`}
              placeholder="Ej: Pasta Carbonara"
              value={form.nombre}
              onChange={(e) => updateField('nombre', e.target.value)}
              onBlur={() => touchField('nombre')}
            />
            {(submitted || touched.nombre) && fieldErrors.nombre && <div className="invalid-feedback">{fieldErrors.nombre}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Puntuación (0-5) <span className="text-danger">*</span></label>
            <input
              type="number"
              className={`form-control ${(fieldErrors.puntuacion && (submitted || touched.puntuacion)) ? 'is-invalid' : ''}`}
              required
              min="0"
              max="5"
              step="0.1"
              value={form.valoracion.puntuacion}
              onChange={(e) => updateValoracion('puntuacion', e.target.value)}
              onBlur={() => touchField('puntuacion')}
            />
            {(submitted || touched.puntuacion) && fieldErrors.puntuacion && <div className="invalid-feedback">{fieldErrors.puntuacion}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Votos <span className="text-danger">*</span></label>
            <input
              type="number"
              className={`form-control ${(fieldErrors.votos && (submitted || touched.votos)) ? 'is-invalid' : ''}`}
              required
              min="0"
              value={form.valoracion.votos}
              onChange={(e) => updateValoracion('votos', e.target.value)}
              onBlur={() => touchField('votos')}
            />
            {(submitted || touched.votos) && fieldErrors.votos && <div className="invalid-feedback">{fieldErrors.votos}</div>}
          </div>

          <div className="col-12">
            <label className="form-label">Categorías <span className="text-danger">*</span></label>
            <div className="d-flex flex-wrap gap-3">
              {categorias.map((item) => (
                <div className="form-check" key={item}>
                  <input
                    id={`cat-${item}`}
                    type="checkbox"
                    className="form-check-input"
                    checked={form.categorias.includes(item)}
                    onChange={() => toggleCategoria(item)}
                  />
                  <label className="form-check-label" htmlFor={`cat-${item}`}>{item}</label>
                </div>
              ))}
            </div>
            {(submitted || touched.categorias) && fieldErrors.categorias && <div className="text-danger small mt-2">{fieldErrors.categorias}</div>}
          </div>

          <div className="col-12">
            <label className="form-label">Descripción <span className="text-danger">*</span></label>
            <textarea
              className={`form-control ${(fieldErrors.descripcion && (submitted || touched.descripcion)) ? 'is-invalid' : ''}`}
              rows="3"
              placeholder="Describe tu receta en detalle..."
              value={form.descripcion}
              onChange={(e) => updateField('descripcion', e.target.value)}
              onBlur={() => touchField('descripcion')}
            />
            <small className="form-text text-muted">{form.descripcion?.length || 0}/1200 caracteres</small>
            {(submitted || touched.descripcion) && fieldErrors.descripcion && <div className="invalid-feedback">{fieldErrors.descripcion}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Ingredientes <span className="text-danger">*</span></label>
            <textarea
              className={`form-control ${(fieldErrors.ingredientes && (submitted || touched.ingredientes)) ? 'is-invalid' : ''}`}
              rows="5"
              value={form.ingredientes}
              onChange={(e) => updateField('ingredientes', e.target.value)}
              onBlur={() => touchField('ingredientes')}
            />
            {(submitted || touched.ingredientes) && fieldErrors.ingredientes && <div className="invalid-feedback">{fieldErrors.ingredientes}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Instrucciones <span className="text-danger">*</span></label>
            <textarea
              className={`form-control ${(fieldErrors.instrucciones && (submitted || touched.instrucciones)) ? 'is-invalid' : ''}`}
              rows="5"
              value={form.instrucciones}
              onChange={(e) => updateField('instrucciones', e.target.value)}
              onBlur={() => touchField('instrucciones')}
            />
            {(submitted || touched.instrucciones) && fieldErrors.instrucciones && <div className="invalid-feedback">{fieldErrors.instrucciones}</div>}
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? 'Guardando...' : editMode ? 'Actualizar' : 'Crear'}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default RecetaForm;
