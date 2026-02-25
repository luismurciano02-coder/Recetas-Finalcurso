# 🔄 Flujo de Datos - Frontend Angular

## 📊 Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USUARIO (NAVEGADOR)                          │
│                        localhost:4200                               │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      AppComponent (Root)                            │
│  ┌──────────── NavbarComponent ────────────┐                        │
│  │  • Logo + Menu Links                     │                       │
│  │  • Toggle Menu (Mobile)                  │                       │
│  │  • Links: Home, Recetas, Nueva Receta    │                       │
│  └──────────────────────────────────────────┘                       │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │              Router Outlet                                    │  │
│  │  (Renderiza componente según ruta)                            │  │
│  │  ┌────────────────────┐   ┌────────────────────┐             │  │
│  │  │ ListComponent      │   │ DetailComponent    │             │  │
│  │  │ (GET /recetas/all) │   │ (GET /recetas/:id) │             │  │
│  │  └────────────────────┘   └────────────────────┘             │  │
│  │  ┌────────────────────┐   ┌────────────────────┐             │  │
│  │  │ FormComponent      │   │ FormComponent      │             │  │
│  │  │ (POST crear)       │   │ (PATCH editar)     │             │  │
│  │  └────────────────────┘   └────────────────────┘             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  └──────────── Footer (Copyright) ────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      RecetaService                                  │
│  (HttpClient - Comunicación con API)                               │
│                                                                      │
│  Methods:                                                            │
│  • obtenerRecetas(params) [GET]                                     │
│  • obtenerRecetaPorId(id) [GET]                                     │
│  • obtenerRecetasRecomendadas() [GET]                               │
│  • crearReceta(data) [POST]                                         │
│  • actualizarReceta(id, data) [PATCH]                               │
│  • eliminarReceta(id) [DELETE]                                      │
│                                                                      │
│  Observables:                                                        │
│  • cargando$ - Estado de carga                                      │
│  • error$ - Mensajes de error                                       │
└─────────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      HTTP Backend API                               │
│                   localhost:3000/api/v1                             │
│                                                                      │
│  GET    /recetas/get/all           (Listar con filtros)            │
│  GET    /recetas/get/:id           (Obtener uno)                   │
│  GET    /recetas/filtros/recomendadas  (Recomendados)              │
│  POST   /recetas/post              (Crear)                         │
│  PATCH  /recetas/update/:id        (Actualizar)                    │
│  DELETE /recetas/delete/:id        (Eliminar)                      │
└─────────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      MongoDB                                         │
│                   localhost:27017                                    │
│                                                                      │
│  Database: recetas_db                                               │
│  Collection: recetas                                                │
│  Documents: ~20 recetas de ejemplo                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔀 Flujos de Casos de Uso

### 1️⃣ **Flujo: Listar Recetas (Inicio)**

```
Usuario Accede → localhost:4200
        ▼
  AppComponent Carga
        ▼
NavbarComponent Renderiza
        ▼
RouterModule ruta → /recetas
        ▼
RecetaListComponent ngOnInit()
        ▼
cargarRecetas() {
    params = {page: 1, limit: 10}
    RecetaService.obtenerRecetas(params)
}
        ▼
service.cargando$ = true (Loader visible)
        ▼
HTTP GET → /recetas/get/all?page=1&limit=10
        ▼
MongoDB busca documentos
        ▼
Backend responde con:
{
  success: true,
  data: [Receta[], Receta[], ...],
  paginacion: {actual: 1, total: 3, ...}
}
        ▼
service.cargando$ = false (Loader desaparece)
        ▼
Componente recibe Observable
        ▼
ngFor renderiza Cards en Grid
        ▼
Usuario ve listado paginado
```

### 2️⃣ **Flujo: Buscar y Filtrar**

```
Usuario tipea en "Buscar" input
        ▼
(busqueda) = $event.target.value
        ▼
Usuario hace click "Aplicar Filtros"
        ▼
aplicarFiltros() {
    paginaActual = 1 (Reset page)
    params = {
        page: 1,
        busqueda: this.busqueda,
        dificultad: this.dificultadFiltro,
        categoria: this.categoriaFiltro,
        vegetariana: this.vegetarianaFiltro,
        sinGluten: this.sinGlutenFiltro,
        ordenar: this.ordenarPor
    }
    cargarRecetas()
}
        ▼
RecetaService.obtenerRecetas(params)
        ▼
HttpClient construye URL:
/recetas/get/all?busqueda=...&dificultad=...&categoria=...
        ▼
Backend filtra en MongoDB
        ▼
Retorna solo recetas coincidentes
        ▼
Grid se actualiza con resultados
        ▼
Paginación recalcula (total = nuevos resultados)
```

### 3️⃣ **Flujo: Ver Detalles**

```
Usuario hace click "Ver Receta" en Card
        ▼
routerLink="/receta/{{receta._id}}"
        ▼
URL → localhost:4200/receta/507f1f...
        ▼
RecetaDetailComponent ngOnInit()
        ▼
ActivatedRoute.snapshot.paramMap.get('id')
        ▼
cargarReceta() {
    service.obtenerRecetaPorId(id)
}
        ▼
HTTP GET → /recetas/get/507f1f...
        ▼
MongoDB findById()
        ▼
Backend retorna objeto Receta completo
        ▼
Componente recibe:
{
  _id: ...,
  titulo: "Pasta Carbonara",
  descripcion: "...",
  ingredientes: ["pasta", "huevos", ...],
  instrucciones: "Paso 1: ...",
  tiempoPreparacion: 25,
  ...
}
        ▼
ngIf *ngIf="receta" renderiza template
        ▼
Usuario ve:
• Imagen grande
• Información completa
• Ingredientes checableables
• Instrucciones
• Botones: Editar, Eliminar
```

### 4️⃣ **Flujo: Crear Receta**

```
Usuario hace click "Nueva Receta"
        ▼
routerLink="/nueva-receta"
        ▼
RecetaFormComponent ngOnInit()
        ▼
esEdicion = false
Formulario inicializa vacío
        ▼
Usuario rellena campos:
• título
• descripción
• instrucciones
• ingredientes (agregar dinámicamente)
• categoría
• dificultad
• ...
        ▼
FormGroup valida en **tiempo real**
        ▼
*ngIf="formulario.get('titulo').invalid"
  Muestra error rojo bajo input
        ▼
Usuario hace click "Guardar"
        ▼
guardarReceta() {
    if (esEdicion = false) {
        service.crearReceta(formulario.value)
    }
}
        ▼
POST → /recetas/post
Header: Content-Type: application/json
Body: {titulo: "...", descripcion: "...", ...}
        ▼
Backend: Mongoose Schema valida
        ▼
MongoDB crea documento nuevo
        ▼
Backend retorna: {success: true, data: Receta}
        ▼
Componente recibe respuesta
        ▼
Alerta verde: "Receta creada ✓"
        ▼
setTimeout (2 s) router.navigate(['/recetas'])
        ▼
Usuario redirigido al listado
```

### 5️⃣ **Flujo: Editar Receta**

```
Usuario en DetailComponent hace click "Editar"
        ▼
routerLink="/editar/{{receta._id}}"
        ▼
URL → localhost:4200/editar/507f1f...
        ▼
RecetaFormComponent ngOnInit()
        ▼
ActivatedRoute.snapshot.paramMap.get('id')
        ▼
esEdicion = true
        ▼
cargarReceta() {
    service.obtenerRecetaPorId(id)
}
        ▼
HTTP GET → /recetas/get/507f1f...
        ▼
Receta actual carga en formulario:
this.formulario.patchValue({
    titulo: receta.titulo,
    descripcion: receta.descripcion,
    ...
})
        ▼
Usuario ve campos pre-rellenados
        ▼
Usuario modifica campos necesarios
        ▼
Botón Submit dice "Actualizar"
        ▼
guardarReceta() {
    service.actualizarReceta(id, formulario.value)
}
        ▼
PATCH → /recetas/update/507f1f...
Body: {...cambios...}
        ▼
Backend: Mongoose actualiza documento
        ▼
MongoDB saveChanges()
        ▼
Backend retorna: {success: true, data: RecetaActualizada}
        ▼
Alerta verde: "Receta actualizada ✓"
        ▼
router.navigate(['/receta', id])
        ▼
Usuario ve DetailComponent con datos nuevos
```

### 6️⃣ **Flujo: Eliminar Receta**

```
Usuario en DetailComponent hace click "Eliminar"
        ▼
Modal aparece: "¿Estás seguro?"
        ▼
Usuario hace click "Cancelar" O "Confirmar"
        ▼
SI "Cancelar":
    Modal desaparece
    Fin

SI "Confirmar":
    eliminarReceta() {
        service.eliminarReceta(id)
    }
        ▼
    HTTP DELETE → /recetas/delete/507f1f...
        ▼
    Backend: Mongoose findByIdAndDelete()
        ▼
    MongoDB elimina documento
        ▼
    Backend retorna: {success: true}
        ▼
    Alerta roja: "Receta eliminada ✓"
        ▼
    setTimeout (2 s) router.navigate(['/recetas'])
        ▼
    Usuario redirigido al listado
    Receta ya no aparece
```

---

## 🔗 Conexión Componente → Servicio → API

### Componente RecetaListComponent

```typescript
// TS: Pide datos
constructor(private recetaService: RecetaService) {}

ngOnInit() {
    this.cargarRecetas();
}

cargarRecetas() {
    this.recetaService.obtenerRecetas({
        page: this.paginaActual,
        limit: 10,
        busqueda: this.busqueda,
        // ...filtros
    }).subscribe({
        next: (response: RecetasListResponse) => {
            this.recetas = response.data;
            this.totalPaginas = response.paginacion.total;
        },
        error: (err) => {
            this.errorMessage = 'Error cargando recetas';
        }
    });
}
```

                                    ▼

### Servicio RecetaService

```typescript
obtenerRecetas(params?: PaginationParams): Observable<RecetasListResponse> {
    let httpParams = new HttpParams();
    
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params?.busqueda) httpParams = httpParams.set('busqueda', params.busqueda);
    // ...más parámetros
    
    return this.http.get<RecetasListResponse>(
        `${environment.apiUrl}/recetas/get/all`,
        { params: httpParams }
    ).pipe(
        tap(() => this.cargando$.next(false)),
        catchError(error => {
            this.error$.next('Error en servidor');
            return throwError(error);
        })
    );
}
```

                                    ▼

### HTTP Request

```
GET http://localhost:3000/api/v1/recetas/get/all?page=1&limit=10&busqueda=...&categoria=...
Headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
```

                                    ▼

### Backend Express Endpoint

```javascript
router.get('/get/all', (req, res) => {
    const { page = 1, limit = 10, busqueda, categoria, ... } = req.query;
    
    // Construir query MongoDB
    const query = {};
    if (busqueda) query.$or = [{titulo: {$regex: busqueda}}, ...];
    if (categoria) query.categoria = categoria;
    // ...más filtros
    
    Receta.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec((err, recetas) => {
            res.json({
                success: true,
                data: recetas,
                paginacion: {
                    actual: page,
                    total: totalPages,
                    registros: limit,
                    total_registros: count
                }
            });
        });
});
```

                                    ▼

### MongoDB Query

```javascript
db.recetas.find({
    titulo: /busqueda/i,
    categoria: "almuerzo"
    // ...más filtros
}).limit(10).skip(0);
```

                                    ▼

### Backend Response

```json
{
    "success": true,
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "titulo": "Pasta Carbonara",
            "descripcion": "Deliciosa pasta...",
            "ingredientes": ["pasta", "huevos", "panceta"],
            "instrucciones": "Paso 1: Cocinar pasta...",
            "tiempoPreparacion": 25,
            "dificultad": "fácil",
            "categoria": "almuerzo",
            "raciones": 4,
            "calorias": 450,
            "vegetariana": false,
            "sinGluten": false,
            "imagen": "https://...",
            "valoracion": 5,
            "createdAt": "2024-02-01T...",
            "updatedAt": "2024-02-01T..."
        },
        // ...más recetas
    ],
    "paginacion": {
        "actual": 1,
        "total": 3,
        "registros": 10,
        "total_registros": 20
    }
}
```

                                    ▼

### Angular Componente Recibe

```typescript
// Angular subscribe recibe response completa
this.recetas = response.data;
this.totalPaginas = response.paginacion.total;

// ngFor renderiza template
*ngFor="let receta of recetas"

// Cada receta muestra en Card
<div class="card">
    <img src="{{receta.imagen}}">
    <h5>{{receta.titulo}}</h5>
    <p>{{receta.descripcion}}</p>
    <span class="badge">{{receta.dificultad}}</span>
    <button (click)="verDetalle(receta._id)">Ver</button>
</div>
```

                                    ▼

### Usuario Ve

```
┌─────────────────────────────────┐
│  RECETAS (Página 1)             │
│                                 │
│  [Buscar] [Filtro] [Ordenar]    │
│                                 │
│  ┌──────────┐ ┌──────────┐      │
│  │Pasta     │ │Ensalada  │      │
│  │Carbonara │ │César     │      │
│  │fácil     │ │fácil     │      │
│  │[Ver]     │ │[Ver]     │      │
│  └──────────┘ └──────────┘      │
│                                 │
│ ◀ 1 2 3 ▶  (Mostrand 1-10 de 20) │
└─────────────────────────────────┘
```

---

## 📦 Estructura de Datos

### Receta (Modelo)

```typescript
interface Receta {
    _id?: string;                          // MongoDB ID
    titulo: string;                        // 3-100 caracteres
    descripcion: string;                   // 10-1000 caracteres
    ingredientes: string[];                // Array, mín 1
    instrucciones: string;                 // mín 20 caracteres
    tiempoPreparacion: number;             // 1-1440 minutos
    dificultad: 'fácil' | 'media' | 'difícil';
    raciones: number;                      // mín 1
    categoria: 'desayuno'|'almuerzo'|'cena'|'postre'|'bebida'|'aperitivo';
    calorias?: number;                     // 0-10000
    vegetariana: boolean;
    sinGluten: boolean;
    favorita: boolean;
    imagen?: string;                       // URL válida
    valoracion?: number;                   // 0-5
    createdAt?: Date;                      // Timestamp auto
    updatedAt?: Date;                      // Timestamp auto
}
```

### Parámetros de Filtro

```typescript
interface PaginationParams {
    page?: number;                         // Por defecto 1
    limit?: number;                        // Por defecto 10
    busqueda?: string;                     // Búsqueda libre
    dificultad?: 'fácil'|'media'|'difícil';
    categoria?: string;
    vegetariana?: boolean;
    sinGluten?: boolean;
    ordenar?: string;                      // '-createdAt', 'titulo', etc
}
```

### Respuesta API

```typescript
interface RecetasListResponse {
    success: boolean;
    data: Receta[];
    paginacion?: {
        actual: number;                    // Página actual
        total: number;                     // Total de páginas
        registros: number;                 // Registros por página
        total_registros: number;           // Total de registros
    },
    message?: string;
}
```

---

## ⚙️ Estados y Eventos

```
Usuario Acción         → Componente Evento    → Servicio HTTP      → Backend Lógica
──────────────────────────────────────────────────────────────────────────────────

Click Buscar           → (click)="aplicarFiltros()"  → obtenerRecetas()  → find()
Cambiar Página         → cambiarPagina(2)           → obtenerRecetas()  → skip/limit
Click Ver Receta       → routerLink="/receta/:id"   → obtenerRecetaPorId() → findById()
Click Editar           → routerLink="/editar/:id"   → obtenerRecetaPorId() → findById()
Rellenar Formulario    → formulario.get()           → [sin HTTP]        → [client-side]
Click Guardar (Crear)  → guardarReceta()            → crearReceta()     → POST insert
Click Guardar (Editar) → guardarReceta()            → actualizarReceta() → PATCH update
Click Eliminar         → eliminarReceta()           → eliminarReceta()  → DELETE remove
```

---

## 🎯 Validaciones en Capas

```
┌───────────────────────────────────────────────────┐
│  CAPA 1: CLIENTE (Angular Reactive Forms)         │
│  ✅ Campo requerido                               │
│  ✅ Longitud mínima/máxima                         │
│  ✅ Patrón regex (email, URL)                      │
│  ✅ Rango de números                              │
│  ✅ Feedback visual (rojo/verde)                   │
│  ✅ Disable submit si inválido                    │
└────────────────┬────────────────────────────────────┘
                 ▼
┌───────────────────────────────────────────────────┐
│  CAPA 2: SERVIDOR (Express Middleware)            │
│  ✅ Validación Joi/express-validator              │
│  ✅ Tipos correctos                               │
│  ✅ Sin duplicados (unique)                        │
│  ✅ Sin valores inválidos                         │
│  ✅ Coherencia datos                              │
└────────────────┬────────────────────────────────────┘
                 ▼
┌───────────────────────────────────────────────────┐
│  CAPA 3: BASE DE DATOS (MongoDB Schema)           │
│  ✅ Mongoose Schema validation                    │
│  ✅ Tipos de dato correctos                       │
│  ✅ Índices (performance)                         │
│  ✅ Restricciones (unique, default)               │
│  ✅ Triggers (pre/post hooks)                     │
└───────────────────────────────────────────────────┘
```

---

## 🔐 Seguridad en la Comunicación

```
Cliente (Angular)
    ▼
Makes HTTPS Request (en producción)
    ▼
Headers:
    {
        Content-Type: application/json,
        CORS: *,
        Authorization: (si aplica)
    }
    ▼
Backend (Express)
    ▼
Valida Headers (CORS middleware)
    ▼
Valida Body (Express validator)
    ▼
Valida en MongoDB Schema
    ▼
Responde con:
    {
        success: true/false,
        data: {...},
        message: "..."
    }
    ▼
Cliente Angular Recibe
    ▼
Actualiza UI
    ▼
Usuario Ve Resultado
```

---

## 📡 HTTP Métodos Usados

| Método | Endpoint | Componente Llamador | Servicio | Operación |
|--------|----------|-------------------|----------|-----------|
| GET | /get/all | RecetaListComponent | obtenerRecetas | 📖 Listar |
| GET | /get/:id | RecetaDetailComponent | obtenerRecetaPorId | 📖 Ver uno |
| GET | /get/recomendadas | (Future) | obtenerRecetasRecomendadas | ⭐ Destacadas |
| POST | /post | RecetaFormComponent | crearReceta | ✍️ Crear |
| PATCH | /update/:id | RecetaFormComponent | actualizarReceta | ✏️ Editar |
| DELETE | /delete/:id | RecetaDetailComponent | eliminarReceta | 🗑️ Eliminar |

---

**🎯 Flujo Completo de Datos Documentado**

Cada interacción usuario → componente → servicio → HTTP → backend → MongoDB → respuesta

Última actualización: Febrero 2026
