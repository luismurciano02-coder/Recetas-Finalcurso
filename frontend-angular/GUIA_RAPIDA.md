# 🚀 GUÍA RÁPIDA - Angular Frontend

## ⚡ Instalación de 2 Minutos

### 1️⃣ **Instalar Dependencias**
```bash
cd frontend-angular
npm install
```

### 2️⃣ **Verificar que Backend está corriendo**
```bash
# Terminal separada
cd backend
npm run dev

# Debe mostrar:
# ✅ MongoDB Connected
# 🚀 Servidor escuchando en puerto 3000
```

### 3️⃣ **Ejecutar Angular**
```bash
npm start
# ó
ng serve
```

### 4️⃣ **Abrir en navegador**
**http://localhost:4200** 🎉

---

## 📁 Estructura de Carpetas

```
src/
├── app/
│   ├── components/          # ✏️ Componentes
│   │   ├── navbar/          # Navegación
│   │   ├── receta-list/     # Listado (paginado, filtros)
│   │   ├── receta-detail/   # Detalle de receta
│   │   └── receta-form/     # Crear/Editar
│   ├── services/            # 🔌 Servicios HTTP
│   │   └── receta.service.ts
│   ├── models/              # 📊 Interfaces TypeScript
│   │   └── receta.model.ts
│   ├── app.module.ts        # 📦 Módulo principal
│   └── app-routing.module.ts # 🛣️ Rutas
└── environments/            # ⚙️ Configuración
    ├── environment.ts       # Desarrollo
    └── environment.prod.ts  # Producción
```

---

## 🎯 Funcionalidades Principales

### ✅ Listado de Recetas
- Grid responsivo con 3 columnas
- Información rápida (tiempo, raciones, calorías, rating)
- Tarjetas elegantes con hover effect

### 🔍 Búsqueda Avanzada
- Búsqueda por título/descripción (en tiempo real)
- 5 filtros independientes:
  - Categoría (desayuno, almuerzo, cena, postre, bebida, aperitivo)
  - Dificultad (fácil, media, difícil)
  - Vegetarianas
  - Sin gluten
  - Ordenamiento flexible

### 📄 Paginación
- 10 registros por página
- Botones: Primera, Anterior, Siguiente, Última
- Navegación de números

### 📖 Detalle de Receta
- Imagen grande
- Todos los datos completos
- Lista de ingredientes interactiva
- Instrucciones paso a paso
- Botones para editar/eliminar

### ✏️ Crear/Editar Recetas
- Formulario reactivo con validaciones en tiempo real
- Gestión dinámica de ingredientes (agregar/eliminar)
- Mensajes de error descriptivos
- Todos los campos con validaciones

### 🎨 UI/UX
- Bootstrap 5
- Responsive (móvil, tablet, desktop)
- Iconos emoji para categorías
- Badges de estado
- Animaciones suaves
- Loaders durante carga
- Mensajes de éxito/error

---

## 🔌 Conexión con API

La aplicación se conecta automáticamente a:
```
http://localhost:3000/api/v1
```

### Headers HTTP
```
Content-Type: application/json
CORS: Habilitado ✅
```

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot GET /" 
**Solución:** Asegúrate de tener Node.js + Angular CLI instalados
```bash
npm install -g @angular/cli@16
```

### ❌ Error: "Port 4200 is already in use"
**Solución:** Usar otro puerto
```bash
ng serve --port 4300
```

### ❌ Error: "Cannot connect to http://localhost:3000"
**Solución:** Verificar que el backend esté corriendo
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend-angular && npm start
```

### ❌ Error: "Module not found"
**Solución:** Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Componentes Disponibles

### **NavbarComponent** (Navegación)
- Links a secciones
- Menú responsivo
- Botón crear receta

### **RecetaListComponent** (Listado)
```typescript
// Datos disponibles:
recetas: Receta[]
cargando: boolean
error: string
paginaActual: number
totalPaginas: number
```

### **RecetaDetailComponent** (Detalle)
- Muestra una receta completa
- Permite editar/eliminar

### **RecetaFormComponent** (Crear/Editar)
- Mismo componente para ambas acciones
- Validaciones en tiempo real
- Gestión de ingredientes

---

## 🔧 Servicios Principales

### **RecetaService**
```typescript
obtenerRecetas(params?: PaginationParams): Observable<RecetasListResponse>
obtenerRecetaPorId(id: string): Observable<RecetaResponse>
obtenerRecetasRecomendadas(): Observable<RecetasListResponse>
crearReceta(receta: Receta): Observable<RecetaResponse>
actualizarReceta(id: string, receta: Partial<Receta>): Observable<RecetaResponse>
eliminarReceta(id: string): Observable<RecetaResponse>
```

**Propiedades Observable:**
```typescript
cargando$: BehaviorSubject<boolean>  // Estado de carga
error$: BehaviorSubject<string>      // Mensaje de error
```

---

## 🎓 Rutas de la App

| URL | Componente | Acción |
|-----|-----------|--------|
| `/` | → Redirección | Va a `/recetas` |
| `/recetas` | RecetaList | Listado paginado |
| `/receta/:id` | RecetaDetail | Ver detalle |
| `/nueva-receta` | RecetaForm | Crear nueva |
| `/editar/:id` | RecetaForm | Editar existente |

---

## 💻 Comandos Útiles

```bash
# Desarrollo
npm start                  # Inicia dev server

# Build
npm run build             # Prepara para producción
ng build                  # Alternativa

# Testing
npm test                  # Ejecuta tests

# Linting
ng lint                   # Revisa código

# Generar componente
ng generate component components/nuevo

# Ver puerto diferente
ng serve --port 4300
```

---

## 📦 Dependencias Clave

| Paquete | Versión | Para qué |
|---------|---------|----------|
| @angular/core | 16.0.0 | Core framework |
| @angular/forms | 16.0.0 | Formularios reactivos |
| @angular/router | 16.0.0 | Enrutamiento |
| @angular/common/http | 16.0.0 | Peticiones HTTP |
| bootstrap | 5.3.0 | UI Components |
| rxjs | 7.8.0 | Observables |

---

## ✨ Validaciones Implementadas

### Formulario de Receta
- ✅ Título: 3-100 caracteres (requerido)
- ✅ Descripción: 10-1000 caracteres (requerido)
- ✅ Instrucciones: mín 20 caracteres (requerido)
- ✅ Tiempo: 1-1440 minutos (requerido)
- ✅ Raciones: mín 1 (requerido)
- ✅ Calorías: 0-10000 (opcional)
- ✅ Categoría: selección obligatoria
- ✅ Ingredientes: mín 1 requerido

---

## 🎯 Lo Próximo

1. **Mejoras UI:**
   - Agregar más estilos personalizados
   - Dark mode
   - Transiciones animadas

2. **Funcionalidades:**
   - Favoritos locales
   - Historial de búsqueda
   - Exportar recetas
   - Compartir recetas

3. **Performance:**
   - Lazy loading de imágenes
   - Caching inteligente
   - Service Workers

---

## 📞 Ayuda

- **Docs Angular:** https://angular.io
- **Bootstrap:** https://getbootstrap.com
- **RxJS:** https://rxjs.dev
- **TypeScript:** https://www.typescriptlang.org

---

**¡Disfruta creando y compartiendo tus recetas! 🍳**

Última actualización: Febrero 2026
