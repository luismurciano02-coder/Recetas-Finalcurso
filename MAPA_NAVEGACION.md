# 🗺️ MAPA DE NAVEGACIÓN - Proyecto Recetas

> **Guía para encontrar exactamente lo que necesitas en la documentación**

---

## 🎯 "Quiero..." → Lee esto

### 1️⃣ Entender el Proyecto Completo

```
¿QUIERO SABER...                    ARCHIVO A LEER
═══════════════════════════════════════════════════════════

□ Qué se hizo en total              → DASHBOARD.md (este archivo)
□ Estructura de archivos            → RESUMEN_ESTRUCTURA.md  
□ Fases 1, 2 y plan para React      → COMPARATIVA_FASES.md
```

**Tiempo de lectura:** 30-45 minutos

---

### 2️⃣ Ejecutar el Backend

```
¿QUIERO...                          PASOS A SEGUIR
═══════════════════════════════════════════════════════════

□ Instalar y ejecutar backend       1. Lee: backend/README.md
                                    2. Sigue: backend/GUIA_IMPLEMENTACION.md
                                    3. Comando: npm run dev

□ Ver endpoints disponibles         → backend/README.md
                                    → Sección "API Endpoints"

□ Entender validaciones             → backend/GUIA_IMPLEMENTACION.md
                                    → Sección "Validaciones"

□ Ver datos/seed                    → backend/seeds/recetas.seed.js
```

**Tiempo de setup:** 5-10 minutos

---

### 3️⃣ Ejecutar Angular

```
¿QUIERO...                          PASOS A SEGUIR
═══════════════════════════════════════════════════════════

□ Instalación rápida (español)      1. Lee: frontend-angular/GUIA_RAPIDA.md
                                    2. Comando: npm install && npm start

□ Documentación completa            → frontend-angular/README.md

□ Entender arquitectura             → frontend-angular/FLUJO_DATOS.md
                                    (Con diagramas)

□ Ver detalles de componentes       → frontend-angular/RESUMEN_IMPLEMENTACION.md

□ Verificar que todo funciona       → frontend-angular/CHECKLIST_VERIFICACION.md
                                    (Paso a paso testing)

□ Troubleshooting/problemas         → frontend-angular/CHECKLIST_VERIFICACION.md
                                    → Sección "Troubleshooting"
```

**Tiempo de setup:** 2-5 minutos  
**Tiempo lectura:** 15-30 minutos

---

### 4️⃣ Entender el Código Angular

```
¿QUIERO SABER...                    BUSCA EN...
═══════════════════════════════════════════════════════════

□ Dónde están los componentes       → frontend-angular/RESUMEN_IMPLEMENTACION.md
                                    → Sección "Componentes"

□ Cómo funciona el servicio HTTP    → frontend-angular/FLUJO_DATOS.md
                                    → Sección "Conexión Componente → API"

□ Qué rutas existen                 → frontend-angular/app-routing.module.ts
                                    → frontend-angular/README.md

□ Estructura de datos               → frontend-angular/src/app/models/receta.model.ts

□ Flujo de datos usuario            → frontend-angular/FLUJO_DATOS.md
                                    → Sección "Flujos de Casos de Uso"

□ Validaciones que se aplican       → frontend-angular/CHECKLIST_VERIFICACION.md
                                    → Sección "Validaciones"
```

---

### 5️⃣ Crear el React Frontend

```
¿QUIERO...                          HAZ ESTO
═══════════════════════════════════════════════════════════

□ Plan para React                   → COMPARATIVA_FASES.md
                                    → Sección "Fase 3 - React"

□ Cómo debe ser React               → Usar Angular como referencia:
                                    → RESUMEN_IMPLEMENTACION.md
                                    → Crear mismos 4 componentes
                                    → Mismo flujo HTTP
                                    → Mismo Bootstrap

□ Estructura de carpetas React      → COMPARATIVA_FASES.md
                                    → Sección "React Planeado"
```

---

### 6️⃣ Desplegar en Producción

```
¿QUIERO...                          INFORMACIÓN EN...
═══════════════════════════════════════════════════════════

□ Urls de producción                → frontend-angular/src/environments/environment.prod.ts
                                    → backend/config/db.js

□ Variables de entorno              → backend/.env.example
```

---

## 📑 LISTADO COMPLETO DE DOCUMENTACIÓN

### En Raíz del Proyecto (`/`)

| Archivo | Propósito | Líneas | Lee Primero Si... |
|---------|-----------|--------|------------------|
| **DASHBOARD.md** | Overview visual del proyecto | 400 | Quieres entender estado general |
| **COMPARATIVA_FASES.md** | Comparación Fase 1, 2, 3 | 400+ | Quieres ver todas las fases |
| **RESUMEN_ESTRUCTURA.md** | Índice de todos los archivos | 500+ | Quieres saber qué archivo es cuál |
| **MAPA_NAVEGACION.md** | Este archivo | 300 | Acabas de llegar y no sabes dónde ir |

### En Backend (`/backend/`)

| Archivo | Propósito | Cuándo leerlo |
|---------|-----------|---------------|
| **README.md** | Setup backend + API docs | Cuando inicies backend |
| **GUIA_IMPLEMENTACION.md** | Detalles técnicos backend | Cuando quieras entender el código |
| **.env.example** | Variables entorno | Cuando configures |

### En Angular (`/frontend-angular/`)

| Archivo | Propósito | Cuándo leerlo |
|---------|-----------|---------------|
| **GUIA_RAPIDA.md** | ⚡ Quick start 2 minutos | PRIMERO (si prisa) |
| **README.md** | Setup completo Angular | Instalación inicial |
| **FLUJO_DATOS.md** | Arquitectura + diagramas | Entender cómo funciona |
| **RESUMEN_IMPLEMENTACION.md** | Detalles de cada componente | Cuando necesites entender un componente |
| **CHECKLIST_VERIFICACION.md** | Testing + troubleshooting | Cuando algo no funcione |

---

## ⏱️ RUTAS DE APRENDIZAJE POR TIEMPO

### 15 Minutos (Express)

```
1. Lee: DASHBOARD.md (5 min)
2. Lee: GUIA_RAPIDA.md (5 min)
3. Ejecuta: npm start (5 min)
```

### 45 Minutos (Comprensión)

```
1. Lee: COMPARATIVA_FASES.md (15 min)
2. Lee: frontend-angular/README.md (15 min)
3. Lee: frontend-angular/FLUJO_DATOS.md (15 min)
```

### 2 Horas (Comprensión Total + Setup)

```
1. Lee: DASHBOARD.md (10 min)
2. Lee: backend/README.md + setup (15 min)
3. Lee: frontend-angular/README.md + setup (15 min)
4. Lee: frontend-angular/FLUJO_DATOS.md (20 min)
5. Lee: frontend-angular/RESUMEN_IMPLEMENTACION.md (30 min)
6. Ejecuta tests: CHECKLIST_VERIFICACION.md (30 min)
```

### 4 Horas (Experto Total)

```
1. Lee todo más arriba (2 horas)
2. Lee: backend/GUIA_IMPLEMENTACION.md (30 min)
3. Lee: frontend-angular/RESUMEN_IMPLEMENTACION.md (45 min)
4. Explora código fuente (45 min)
```

---

## 🔍 BÚSQUEDA RÁPIDA POR TEMA

### Búsqueda y Filtros

```
¿Dónde se implementan los filtros?  → frontend-angular/RESUMEN_IMPLEMENTACION.md
                                    → Sección "RecetaListComponent"

¿Cómo funcionan los filtros?        → frontend-angular/FLUJO_DATOS.md
                                    → Sección "Flujo: Buscar y Filtrar"

¿Qué filtros existen?              → frontend-angular/CHECKLIST_VERIFICACION.md
                                    → Tabla "Filtros Implementados"
```

### CRUD (Crear/Leer/Update/Delete)

```
CREATE
  - Componente: frontend-angular/src/app/components/receta-form/
  - Endpoint: backend/routes/recetas.js → POST /post
  - Cómo: FLUJO_DATOS.md → "Flujo: Crear Receta"

READ
  - Componentes: receta-list/, receta-detail/
  - Endpoints: backend/routes → GET /get/all, GET /get/:id
  - Cómo: FLUJO_DATOS.md → "Flujo: Listar", "Flujo: Ver Detalles"

UPDATE
  - Componente: frontend-angular/src/app/components/receta-form/
  - Endpoint: backend/routes → PATCH /update/:id
  - Cómo: FLUJO_DATOS.md → "Flujo: Editar Receta"

DELETE
  - Componente: frontend-angular/src/app/components/receta-detail/
  - Endpoint: backend/routes → DELETE /delete/:id
  - Cómo: FLUJO_DATOS.md → "Flujo: Eliminar Receta"
```

### Validaciones

```
Cliente (Angular):  → frontend-angular/RESUMEN_IMPLEMENTACION.md
                    → Sección "RecetaFormComponent"

Servidor (Backend): → backend/middleware/validation.js
                    → backend/GUIA_IMPLEMENTACION.md

Base de datos:      → backend/models/Receta.js
```

### Bootstrap

```
¿Cómo se usa Bootstrap?      → frontend-angular/README.md
                             → Sección "Bootstrap 5 Integration"

¿Qué componentes hay?        → frontend-angular/RESUMEN_IMPLEMENTACION.md
                             → Sección "Estilos y UI/UX"

¿Responsive design?          → frontend-angular/CHECKLIST_VERIFICACION.md
                             → Sección "Test 9: Responsive"
```

### Errores / Troubleshooting

```
¿Qué hacer si...?            → frontend-angular/CHECKLIST_VERIFICACION.md
                             → Sección "Troubleshooting"

Puerto ocupado               → CHECKLIST → No.2
No conecta API              → CHECKLIST → No.3
Backend respondiendo lento  → backend/GUIA_IMPLEMENTACION.md
```

---

## 📊 ÍNDICE DE ARCHIVOS FUENTE

### Backend Código

```
backend/
├── server.js                      ← Servidor Express (116 líneas)
├── models/Receta.js               ← Schema MongoDB
├── routes/recetas.js              ← 7 endpoints API
├── middleware/validation.js       ← Validaciones
├── config/db.js                   ← Conexión MongoDB
├── config/constants.js            ← Constantes
└── seeds/recetas.seed.js          ← 20 recetas ejemplo
```

### Angular Código Importante

```
frontend-angular/src/app/
├── services/receta.service.ts     ← 6 métodos HTTP
├── models/receta.model.ts         ← Interfaces TypeScript
├── app.module.ts                  ← Módulo principal
├── app-routing.module.ts          ← 6 rutas
└── components/
    ├── navbar/
    ├── receta-list/               ← Listado + filtros
    ├── receta-detail/             ← Detalles
    └── receta-form/               ← Crear/editar
```

---

## 🎓 APRENDE POR CONCEPTO

### Conceptos Backend

```
Servidor Express        → backend/README.md
MongoDB/Mongoose        → backend/GUIA_IMPLEMENTACION.md
API REST                → backend/routes/recetas.js
Validaciones            → backend/middleware/validation.js
Seed de datos           → backend/seeds/recetas.seed.js
```

### Conceptos Angular

```
Componentes             → RESUMEN_IMPLEMENTACION.md
Servicios HTTP          → frontend-angular/services/receta.service.ts
Reactive Forms          → frontend-angular/components/receta-form/
Routing                 → frontend-angular/app-routing.module.ts
RxJS Observables        → FLUJO_DATOS.md
Bootstrap               → Cualquier componente .html
```

---

## 💡 PREGUNTAS FRECUENTES

```
"¿Por dónde empiezo?"          → DASHBOARD.md + GUIA_RAPIDA.md
"¿Cómo instalo?"               → backend/README.md + GUIA_RAPIDA.md
"¿Dónde está X componente?"    → RESUMEN_ESTRUCTURA.md
"¿Cómo funciona X?"            → FLUJO_DATOS.md (busca por nombre)
"Me da error..."               → CHECKLIST_VERIFICACION.md → Troubleshooting
"¿Dónde está el endpoint?"     → backend/routes/recetas.js
"¿Cuáles son las rutas?"       → app-routing.module.ts
"¿Cómo se valida?"             → RESUMEN_IMPLEMENTACION.md → Validaciones
"¿Es responsive?"              → Lee frontend-angular/CHECKLIST
"¿Funciona realmente?"         → CHECKLIST_VERIFICACION.md → Test manual
```

---

## 🚀 FLUJO RECOMENDADO

```
PRINCIPIANO (Nunca tocó el código)
│
├─ Lee: DASHBOARD.md (5 min)
├─ Lee: GUIA_RAPIDA.md (5 min)
├─ Ejecuta: npm start (5 min)
├─ Lee: FLUJO_DATOS.md (20 min)
├─ Prueba: CHECKLIST_VERIFICACION.md (30 min)
└─ Fee confident ✅

DESARROLLADOR (Conoce Node/Angular)
│
├─ Lee: COMPARATIVA_FASES.md (10 min)
├─ Ejecuta: cd backend && npm run dev (2 min)
├─ Ejecuta: cd frontend-angular && npm start (2 min)
├─ Explora: Código fuente
└─ Listo para customizar ✅

EXPERTO (Quiere entender TODO)
│
├─ Lee: Todos los markdown
├─ Lee: Todo el código fuente
├─ Ejecuta: Backend + Angular
├─ Modifica: Código para aprender
└─ Listo para crear React ✅
```

---

## 📁 VER ARCHIVO EN VSCODE

Si usas **VS Code**, puedes abrir estos archivos directamente:

```
# Desde terminal en raíz del proyecto:
code DASHBOARD.md
code COMPARATIVA_FASES.md
code frontend-angular/GUIA_RAPIDA.md
code frontend-angular/FLUJO_DATOS.md
code frontend-angular/CHECKLIST_VERIFICACION.md

# O simplemente navega el explorador de archivos
```

---

## 🎯 HOJA DE TRUCOS RÁPIDA

### Comandos Importantes

```bash
# Backend
cd backend
npm install
npm run dev

# Angular (en otra terminal)
cd frontend-angular
npm install
npm start

# Ver Angular en browser
# http://localhost:4200

# Si algo no funciona
# Lee: frontend-angular/CHECKLIST_VERIFICACION.md → Troubleshooting
```

### URLs Importantes

```
Backend API:        http://localhost:3000
API Documentation:  http://localhost:3000/api-doc
Angular App:        http://localhost:4200
React App (próxima):http://localhost:5173
```

### Archivos Clave

```
Backend:            backend/routes/recetas.js
Service Angular:    frontend-angular/src/app/services/receta.service.ts
Models:             frontend-angular/src/app/models/receta.model.ts
Rutas:              frontend-angular/src/app/app-routing.module.ts
```

---

## ✨ CONCLUSIÓN

```
NECESITO HACER...                →  ABRE ESTE ARCHIVO

Empezar rápido (2 min)           → GUIA_RAPIDA.md
Entender proyecto                → DASHBOARD.md
Ver estructura                   → RESUMEN_ESTRUCTURA.md
Comparar fases                   → COMPARATIVA_FASES.md
Entender arquitectura            → FLUJO_DATOS.md
Detalles Angular                 → RESUMEN_IMPLEMENTACION.md
Verificar que funciona           → CHECKLIST_VERIFICACION.md
Backend                          → backend/README.md
Ayuda backend                    → backend/GUIA_IMPLEMENTACION.md
Error o problema                 → CHECKLIST_VERIFICACION.md → Troubleshoot
Entender CRUD                    → FLUJO_DATOS.md → Casos de Uso
Saber qué archivo es cuál        → RESUMEN_ESTRUCTURA.md
```

---

## 📞 MAPA VISUAL GLOBAL

```
┌────────────────────────────────────────────────────────┐
│               PROYECTO RECETAS DWEC                    │
├────────────────────────────────────────────────────────┤
│                                                         │
│  📍 ESTOY AQUÍ (MAPA DE NAVEGACIÓN)                   │
│     ↓                                                   │
│  ├─→ 🏃 Prisa = GUIA_RAPIDA.md                        │
│  ├─→ 🔍 Busco algo = RESUMEN_ESTRUCTURA.md            │
│  ├─→ 📚 Quiero aprender = FLUJO_DATOS.md              │
│  ├─→ 🛠️ Necesito troubleshoot = CHECKLIST.md          │
│  ├─→ 🎯 Overview = DASHBOARD.md                       │
│  └─→ 🧵 Fases = COMPARATIVA_FASES.md                 │
│                                                         │
│  🔙 Backend: backend/README.md                         │
│  🔧 Angular: frontend-angular/README.md               │
│  ⚛️ React: COMPARATIVA_FASES.md (plan)               │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

**Última actualización: Febrero 2026**  
**Tu guía de navegación por la documentación**  
**GitHub Copilot** 🤖
