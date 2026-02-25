# Notas de Desarrollo - Proyecto Final Recetas

## Estado del Proyecto

### ✅ FASE 1 - BACKEND: COMPLETADO

El backend está 100% funcional e implementado con todos los requisitos:

#### Estructura Backend Completada:
- ✅ `src/config/database.js` - Conexión a MongoDB
- ✅ `src/models/Recipe.js` - Modelo completo con validaciones
- ✅ `src/controllers/recipeController.js` - Controlador con toda la lógica
- ✅ `src/routes/recipeRoutes.js` - Rutas CRUD
- ✅ `src/middlewares/errorHandler.js` - Manejo de errores global
- ✅ `src/app.js` - Configuración de Express
- ✅ `src/server.js` - Punto de entrada
- ✅ `src/seed.js` - Script con 20+ recetas
- ✅ `package.json` - Dependencias correctas
- ✅ `.env.example` - Variables de entorno
- ✅ `README.md` - Documentación completa

#### Características Implementadas:
- ✅ 7 endpoints CRUD + documentación
- ✅ Paginación en GET /all
- ✅ 3 reglas de negocio obligatorias implementadas
- ✅ Validaciones de datos integradas
- ✅ Status codes HTTP correctos
- ✅ CORS configurado
- ✅ Manejo robusto de errores
- ✅ 20+ registros de ejemplo en seed

#### Reglas de Negocio Implementadas:
1. ✅ No permitir duplicados por título
2. ✅ Validar rangos de valores (tiempo, calorías, raciones)
3. ✅ Restricciones de coherencia (receta vegetariana sin carnes)

---

### 📋 FASE 2 - FRONTEND ANGULAR: POR DESARROLLAR

Estructura de carpetas creada:
- 📁 `frontend-angular/src/` - Carpeta preparada

Tareas pendientes:
- [ ] Generar proyecto Angular (ng new)
- [ ] Crear estructura de componentes
- [ ] Servicio HTTP para API
- [ ] Componente de listado de recetas
- [ ] Componente de detalle de receta
- [ ] Formularios reactivos CRUD
- [ ] Tabla con Bootstrap
- [ ] Paginación
- [ ] Filtros avanzados
- [ ] Manejo de loaders y errores

---

### 📋 FASE 3 - FRONTEND REACT: POR DESARROLLAR

Estructura de carpetas creada:
- 📁 `frontend-react/src/` - Carpeta preparada

Tareas pendientes:
- [ ] Generar proyecto React (create-react-app o Vite)
- [ ] Estructura de componentes funcionales
- [ ] Setup de Fetch/Axios
- [ ] Componente de listado
- [ ] Componente de detalle
- [ ] Formularios controlados
- [ ] React Router
- [ ] Hooks para gestión de estado
- [ ] Bootstrap
- [ ] Paginación y filtros

---

## 🚀 Instrucciones para Ejecutar el Backend

### 1. Ir a la carpeta backend
```bash
cd backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear archivo .env
```bash
cp .env.example .env
```

Editar `.env` si es necesario (por defecto usa MongoDB local):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recetas-db
NODE_ENV=development
```

### 4. Asegurar que MongoDB está ejecutándose
```bash
# En otra terminal
mongod  # O tu método de inicio de MongoDB
```

### 5. Cargar datos iniciales (opcional pero recomendado)
```bash
npm run seed
```

### 6. Ejecutar servidor
**Desarrollo:**
```bash
npm run dev  # Con nodemon, reinicia automáticamente
```

**Producción:**
```bash
npm start
```

### 7. Verificar que funciona
```bash
curl http://localhost:3000/health
# Respuesta esperada: {"success":true,"message":"API Recetas funcionando correctamente ✅"}
```

---

## 📚 Documentación de API

La documentación completa está disponible en:
- **En navegador:** http://localhost:3000/api/v1/documentacion
- **En archivo:** Ver `README.md` (secciones de Endpoints)

---

## 🧪 Testing

### Con Postman:
1. Importar colección desde `backend/postman_collection.json`
2. Ejecutar requests

### Con curl:
```bash
# Ver todos los endpoints
curl http://localhost:3000/api/v1/documentacion

# Obtener todas las recetas
curl http://localhost:3000/api/v1/recetas/get/all

# Crear una receta
curl -X POST http://localhost:3000/api/v1/recetas/post \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi Receta",
    "descripcion": "Una descripción detallada",
    "ingredientes": ["ing1", "ing2"],
    "instrucciones": "Pasos a seguir",
    "tiempoPreparacion": 30,
    "raciones": 4,
    "categoria": "almuerzo"
  }'
```

---

## 📊 Base de Datos

### Modelo de Receta:

**Campos Obligatorios:**
- `titulo` (string, 3-100 caracteres, único)
- `descripcion` (string, 10-1000 caracteres)
- `ingredientes` (array de strings, mínimo 1)
- `instrucciones` (string, mínimo 20 caracteres)
- `tiempoPreparacion` (number, 1-1440 minutos)
- `raciones` (number, mínimo 1)
- `categoria` (enum: desayuno, almuerzo, cena, postre, bebida, aperitivo)

**Campos Opcionales:**
- `dificultad` (enum: fácil, media, difícil; default: media)
- `calorias` (number, 0-10000; default: 0)
- `vegetariana` (boolean; default: false)
- `sinGluten` (boolean; default: false)
- `favorita` (boolean; default: false)
- `imagen` (string URL)
- `valoracion` (number, 0-5; default: 0)
- `createdAt` (date, auto)
- `updatedAt` (date, auto)

### Recetas Incluidas en Seed:
20+ recetas reales distribuidas en:
- Pasta Carbonara, Ensalada, Tacos, Sushi, Gazpacho, etc.
- Mix de dificultades (fácil, media, difícil)
- Variedad de categorías
- Algunas vegetarianas y sin gluten
- Valoraciones realistas (4-5 estrellas)

---

## ⚙️ Próximos Pasos

### Fase 2 - Angular:
```bash
cd frontend-angular
ng new . --skip-git
ng generate component components/receta-list
ng generate component components/receta-detail
ng generate service services/receta
```

### Fase 3 - React:
```bash
cd frontend-react
npx create-react-app .
# o con Vite:
npm create vite@latest . -- --template react
```

---

## 🐛 Notas Conocidas

- MongoDB debe estar ejecutándose en `localhost:27017`
- La API espera solicitudes con Content-Type: application/json
- CORS está configurado para localhost:3001, 4200, 5173

---

## 📞 Estructura de Respuestas de Error

Todas las respuestas de error siguen este formato:

```json
{
  "success": false,
  "error": "Descripción del error",
  "detalles": ["información adicional", "..."]
}
```

Con status codes HTTP estándar:
- 400 - Bad Request (validación fallida)
- 404 - Not Found (recurso no existe)
- 409 - Conflict (regla de negocio violada)
- 500 - Internal Server Error

---

Última actualización: Febrero 2026

