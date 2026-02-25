# RECETAS-FINALCURSO

Proyecto full-stack con backend en Node.js + Express + MongoDB (Mongoose) y dos frontends (Angular y React) consumiendo la misma API.

## 1) Estructura del proyecto

```text
RECETAS-FINALCURSO/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── Recipe.js
│   │   ├── controllers/
│   │   │   └── recipeController.js
│   │   ├── routes/
│   │   │   └── recipeRoutes.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   └── validateRecipe.js
│   │   ├── app.js
│   │   ├── server.js
│   │   └── seed.js
│   └── package.json
├── frontend-angular/
└── frontend-react/
```

## 2) Entidad principal: Receta

Campos implementados:

- `_id` (id MongoDB)
- `nombre` (string)
- `descripcion` (string)
- `tiempoPreparacion` (number)
- `fechaPublicacion` (date)
- `esPublicada` (boolean)
- `categoria` (string)
- `ingredientes` (array de string)
- `pasos` (array de string)
- `imagenUrl` (string)
- `createdAt` y `updatedAt` (automáticos)

## 3) Reglas de negocio obligatorias

- No permitir recetas duplicadas por nombre.
- Validar que `tiempoPreparacion` sea mayor a 0.
- No permitir fechas de publicación en el pasado.
- Permitir filtrar por categoría.
- No permitir recetas sin ingredientes.

## 4) Endpoints de la API

Base URL:

```text
http://localhost:3000/api/v1/recetas
```

- `GET /get/all`
- `GET /get/:id`
- `POST /post`
- `PUT /update/:id`
- `DELETE /delete/:id`
- `GET /paginate?page=1&limit=10`

También soporta filtro por categoría en listados/paginación con `?categoria=...`.

## 5) Seed de datos

Se incluye `backend/src/seed.js` con **20 recetas iniciales** de ejemplo compatibles con las validaciones.

## 6) Instalación y ejecución

### Requisitos previos

- Node.js 18+
- MongoDB en local o remoto

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend Angular

```bash
cd frontend-angular
npm install
npm start
```

URL esperada: `http://localhost:4200`

### Frontend React

```bash
cd frontend-react
npm install
npm run dev
```

URL esperada: `http://localhost:5173`

## 7) Funcionalidad frontend incluida

### Angular

- Listado con paginación y filtro por categoría.
- Búsqueda local por nombre/descripcion.
- CRUD completo.
- Formularios reactivos con validaciones visuales y funcionales.
- Loader y alertas de éxito/error.
- Bootstrap integrado.

### React

- Componentes funcionales.
- Hooks `useState` y `useEffect`.
- React Router.
- CRUD completo.
- Formularios controlados con validaciones.
- Alertas y paginación.
- Bootstrap integrado.

## 8) Espacios para despliegue y evidencias

- URL Backend desplegado: ___________________________
- URL Frontend Angular desplegado: __________________
- URL Frontend React desplegado: ____________________

Capturas sugeridas:

- [ ] Listado Angular
- [ ] Formulario Angular
- [ ] Detalle Angular
- [ ] Listado React
- [ ] Formulario React
- [ ] Detalle React
- [ ] Respuesta paginada API en Postman
