const API_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://recetas-finalcurso-backend.vercel.app/api/v1/recetas'
    : 'http://localhost:3000/api/v1/recetas');

const buildQuery = ({ page = 1, limit = 6, categoria = '', q = '' } = {}) => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  if (categoria) params.set('categoria', categoria);
  if (q) params.set('q', q);
  return params.toString();
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || data?.status || 'Error en la petición');
  }
  return data;
};

export const recetaService = {
  async getPaginated({ page = 1, limit = 6, categoria = '', q = '' } = {}) {
    const query = buildQuery({ page, limit, categoria, q });
    const response = await fetch(`${API_URL}/paginate?${query}`);
    return handleResponse(response);
  },

  async getAll() {
    const response = await fetch(`${API_URL}/`);
    const result = await handleResponse(response);
    return result.status || [];
  },

  async getCategorias() {
    const response = await fetch(`${API_URL}/categorias`);
    const result = await handleResponse(response);
    return result.status || [];
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/receta/${id}`);
    const result = await handleResponse(response);
    return result.status;
  },

  async create(payload) {
    const response = await fetch(`${API_URL}/anadir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async update(id, payload) {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async remove(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};
