# RECETAS-FINALCURSO

Proyecto full-stack con backend en Node.js + Express + MongoDB (Mongoose) y dos frontends (Angular y React) consumiendo la misma API.

## 1) Estructura del proyecto
# Recetas Final Curso (DWEC)

Proyecto full-stack con arquitectura tipo MEAN (MongoDB, Express, Angular, Node) + frontend React alternativo. Ambos frontends consumen la misma API REST de recetas.

## Descripción

Aplicación para gestionar recetas con operaciones CRUD completas, validaciones en backend y frontend, filtrado por categoría y paginación en API.

## Tecnologías

- Backend: Node.js, Express, MongoDB, Mongoose, Morgan, CORS
- Frontend Angular: Angular 19, Bootstrap 5, HttpClient, Reactive Forms
- Frontend React: React 18, React Router, Bootstrap 5, Fetch API

## Estructura real del proyecto

```text
RECETAS-FINALCURSO/
├── backend/
│   ├── index.js
│   ├── database.js
│   ├── models/
│   │   └── receta.model.js
│   ├── controllers/
│   │   └── receta.controller.js
│   ├── routes/
│   │   └── receta.route.js
│   └── package.json
├── frontend-angular/
│   └── ...
└── frontend-react/
		└── ...
```

## Entidad principal: Receta

```json
{
	"nombre": "String (obligatorio)",
	"descripcion": "String (obligatorio)",
	"ingredientes": "String (obligatorio)",
	"instrucciones": "String (obligatorio)",
	"categorias": ["String (obligatorio)"],
	"valoracion": {
		"puntuacion": "Number (obligatorio)",
		"votos": "Number (obligatorio)"
	}
}
```

## Reglas de negocio implementadas

- Validación de campos obligatorios en backend para crear y actualizar.
- Respuesta `400` con detalle de campos cuando faltan valores.
- Validación adicional de tipos numéricos en `valoracion.puntuacion` y `valoracion.votos`.
- Listado de categorías únicas desde la base de datos.
- Paginación backend con `page` y `limit`, y filtros por `categoria` y `q`.

## API REST

Base URL local:

```text
http://localhost:3000/api/v1/recetas
```

### Endpoints

- `GET /` → lista completa
- `GET /paginate?page=1&limit=10&categoria=&q=` → lista paginada
- `GET /receta/:id` → detalle por id
- `POST /anadir` → crear receta
- `PUT /actualizar/:id` → actualizar receta
- `DELETE /:id` → eliminar receta
- `GET /categorias` → categorías existentes

## Instalación y ejecución

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Servidor API en:

```text
http://localhost:3000
```

### 2) Frontend Angular

```bash
cd frontend-angular
npm install
npm start
```

### 3) Frontend React

```bash
cd frontend-react
npm install
npm run dev
```

## Funcionalidad frontend

### Angular

- CRUD completo
- Formularios reactivos
- Validaciones visuales campo a campo
- Mensajes de error y éxito
- Paginación y filtros
- Bootstrap

### React

- CRUD completo
- Validaciones visuales campo a campo (obligatorios en rojo)
- Mensajes de error por campo y generales
- Paginación conectada al endpoint backend
- Bootstrap

## Autor

Proyecto desarrollado por **Luis Murciano**.

## Licencia

Uso educativo.

