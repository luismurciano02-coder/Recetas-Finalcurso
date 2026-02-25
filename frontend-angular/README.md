# Angular Frontend - Recetas App

Este es el cliente Angular de la aplicación de gestión de recetas.

## Estructura del Proyecto

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── receta.model.ts          # Interfaces TypeScript
│   │   ├── services/
│   │   │   └── receta.service.ts        # Servicio HTTP
│   │   ├── components/
│   │   │   ├── navbar/                  # Barra de navegación
│   │   │   ├── receta-list/             # Listado de recetas
│   │   │   ├── receta-detail/           # Detalle de receta
│   │   │   └── receta-form/             # Formulario CRUD
│   │   ├── app.component.*              # Componente raíz
│   │   ├── app.module.ts                # Módulo principal
│   │   └── app-routing.module.ts        # Rutas
│   ├── environments/                    # Configuración por entorno
│   ├── index.html                       # HTML principal
│   ├── main.ts                          # Punto de entrada
│   └── styles.css                       # Estilos globales
├── angular.json                         # Configuración Angular CLI
├── tsconfig.json                        # Configuración TypeScript
└── package.json                         # Dependencias
```

## ✨ Características Implementadas

### Servicios HTTP
- ✅ `RecetaService` con métodos para CRUD completo
- ✅ Gestión de estados de carga y error con RxJS
- ✅ Parámetros de búsqueda y filtrado avanzado
- ✅ Manejo robusto de errores HTTP

### Componentes

#### 1. **NavbarComponent**
- Barra de navegación con menú responsivo
- Enlaces a secciones principales
- Botón para crear nueva receta

#### 2. **RecetaListComponent** 
- Listado en grid con 3 columnas (responsive)
- 🔍 Búsqueda por título/descripción
- 🏷️ Filtros por:
  - Categoría (desayuno, almuerzo, cena, postre, bebida, aperitivo)
  - Dificultad (fácil, media, difícil)
  - Vegetariana / Sin gluten
  - Ordenamiento múltiple
- 📄 Paginación funcional
- Tarjetas con información rápida
- Enlaces a detalle y edición

#### 3. **RecetaDetailComponent**
- Vista completa de una receta
- Imagen destacada
- Información detallada (tiempo, raciones, calorías, valoración)
- Lista de ingredientes con checkboxes
- Instrucciones paso a paso
- Botones para editar y eliminar
- Modal de confirmación para eliminar

#### 4. **RecetaFormComponent**
- Formulario reactivo con validaciones
- 📝 Crear y editar recetas (mismo componente)
- ✅ Validaciones en tiempo real
- Gestión dinámica de ingredientes (agregar/eliminar)
- Todos los campos del modelo
- Mensajes de error descriptivos
- Indicadores de carga durante guardado

### Funcionalidades

✅ **Listado & Búsqueda**
- Paginación (10 registros por página)
- Búsqueda de texto inteligente
- Múltiples filtros combinables
- Ordenamiento flexible

✅ **CRUD Completo**
- Crear nuevas recetas
- Leer/visualizar detalles
- Actualizar información
- Eliminar con confirmación

✅ **Validaciones**
- Validadores integrados en formularios reactivos
- Mensajes de error contextuales
- Validación servidor-cliente

✅ **UI/UX**
- Bootstrap 5 totalmente integrado
- Diseño responsivo (mobile-first)
- Iconos emoji para categorías
- Badges de estado
- Animaciones suaves
- Loaders de carga
- Mensajes de éxito/error

✅ **Gestión de Estado**
- RxJS Observables y BehaviorSubjects
- Estados de carga y error centralizados
- Manejo robusto de peticiones HTTP

## 🚀 Instalación y Setup

### Requisitos Previos
- Node.js 16+ 
- Angular CLI 16+

### Instalación

```bash
cd frontend-angular

# Instalar dependencias
npm install

# Instalar Angular CLI globalmente (si no lo tienes)
npm install -g @angular/cli
```

### Variables de Entorno

Los archivos de entorno ya están configurados:

**`src/environments/environment.ts`** (desarrollo):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

**`src/environments/environment.prod.ts`** (producción):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.recetas.example.com/api/v1'
};
```

## 🏃 Ejecutar

### Modo Desarrollo
```bash
npm start
# o
ng serve
```

Acceso: **http://localhost:4200**

El servidor se reiniciará automáticamente al cambiar archivos.

### Modo Producción
```bash
npm run build
# Genera carpeta dist/ optimizada
```

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| @angular/core | 16.0.0 | Framework principal |
| @angular/forms | 16.0.0 | Formularios reactivos |
| @angular/router | 16.0.0 | Enrutamiento |
| @angular/common/http | 16.0.0 | Peticiones HTTP |
| bootstrap | 5.3.0 | Framework CSS |
| rxjs | 7.8.0 | Programación reactiva |

## 🎯 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | → `/recetas` | Redirección a listado |
| `/recetas` | RecetaListComponent | Listado paginado |
| `/receta/:id` | RecetaDetailComponent | Detalle de receta |
| `/nueva-receta` | RecetaFormComponent | Crear nueva |
| `/editar/:id` | RecetaFormComponent | Editar existente |
| `**` | → `/recetas` | 404 fallback |

## 🔌 Integración con API

El servicio `RecetaService` se comunica con la API backend en `http://localhost:3000/api/v1`:

### Métodos Disponibles

```typescript
// Obtener recetas con filtros
obtenerRecetas(params?: PaginationParams): Observable<RecetasListResponse>

// Obtener una receta
obtenerRecetaPorId(id: string): Observable<RecetaResponse>

// Obtener recomendadas
obtenerRecetasRecomendadas(): Observable<RecetasListResponse>

// Crear receta
crearReceta(receta: Receta): Observable<RecetaResponse>

// Actualizar
actualizarReceta(id: string, receta: Partial<Receta>): Observable<RecetaResponse>

// Eliminar
eliminarReceta(id: string): Observable<RecetaResponse>
```

## 🛠️ Desarrollo

### Estructura de Componentes

Cada componente sigue el patrón Angular estándar:
```
componente/
├── componente.component.ts       # Lógica
├── componente.component.html     # Template
└── componente.component.css      # Estilos
```

### Agregar Nuevo Componente

```bash
ng generate component components/nuevo-componente
# o
ng g c components/nuevo-componente
```

### Agregar Nuevo Servicio

```bash
ng generate service services/nuevo-servicio
# o
ng g s services/nuevo-servicio
```

## 💡 Mejores Prácticas Implementadas

✅ Componentes pequeños y reutilizables
✅ Lógica en servicios, presentación en componentes
✅ Formularios reactivos (mejor que template-driven)
✅ Tipado fuerte con TypeScript
✅ Gestión de suscripciones con Observables
✅ Validaciones en tiempo real
✅ Manejo centralizado de errores
✅ Responsive design con Bootstrap
✅ Accesibilidad (labels, ARIA, etc.)

## 📱 Responsividad

El diseño es **mobile-first** usando las clases de Bootstrap:
- `col-12` - Móvil (320px+)
- `col-md-6` - Tablet (768px+)
- `col-lg-4` - Desktop (992px+)

## 🐛 Troubleshooting

**ERROR: Cannot find module '@angular/cli'**
```bash
npm install -g @angular/cli@16
```

**Puerto 4200 ya en uso**
```bash
ng serve --port 4300
```

**Error de conexión a API**
- Verificar que backend esté en http://localhost:3000
- Revisar consola del navegador (DevTools > Network)
- Verificar CORS en backend

**Módulo no encontrado**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Recursos

- [Documentación Angular](https://angular.io)
- [Bootstrap Components](https://getbootstrap.com/docs)
- [RxJS Guide](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Última actualización:** Febrero 2026
