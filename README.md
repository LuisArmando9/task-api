# API de Gestión de Tareas

Una API RESTful construida con NestJS para la gestión de tareas con autenticación de usuarios.

## Documentación API en Vivo

La API está desplegada y accesible en:
- Documentación Swagger en vivo: [https://task-api-bemoba.fly.dev/api/docs](https://task-api-bemoba.fly.dev/api/docs)
- URL base de la API: `https://task-api-bemoba.fly.dev`

## Características

- Gestión de Usuarios (Autenticación y Autorización)
- Operaciones CRUD de Tareas
- Gestión de Estados y Prioridades de Tareas
- Filtrado y Ordenamiento de Tareas
- Documentación Swagger
- Integración con Firebase
- CORS Habilitado
- Pipes de Validación
- Interceptor de Respuesta Global
- Filtro de Manejo de Errores

## Arquitectura

### Arquitectura Limpia

Este proyecto sigue los principios de Arquitectura Limpia, separando el código en capas:

```
src/
├── core/                          # Funcionalidad central
│   ├── filters/                   # Filtros globales de error
│   └── interceptors/             # Interceptores de respuesta
│
├── user/                         # Módulo de usuarios
│   ├── core/                     # Capa de dominio
│   │   ├── domain/              
│   │   │   ├── models/          # Modelos de dominio
│   │   │   └── interfaces/      # Interfaces de dominio
│   │   └── use-cases/          # Casos de uso
│   ├── infrastructure/          # Capa de infraestructura
│   │   ├── adapters/           # Adaptadores externos
│   │   └── repositories/       # Repositorios de datos
│   └── application/            # Capa de aplicación
│       ├── controllers/        # Controladores HTTP
│       └── services/          # Servicios de aplicación
│
├── task/                        # Módulo de tareas
│   ├── core/                   # Capa de dominio
│   │   ├── domain/
│   │   │   ├── models/        # Modelos de dominio de tareas
│   │   │   ├── enums/         # Enumeraciones de tareas
│   │   │   └── interfaces/    # Interfaces de tareas
│   │   └── use-cases/        # Casos de uso de tareas
│   ├── infrastructure/        # Capa de infraestructura
│   │   ├── adapters/         # Adaptadores externos
│   │   │   └── dtos/        # Objetos de transferencia de datos
│   │   └── repositories/     # Repositorios de tareas
│   └── application/          # Capa de aplicación
│       ├── controllers/      # Controladores de tareas
│       └── services/        # Servicios de tareas
│
└── main.ts                    # Punto de entrada de la aplicación
```

### Patrones de Diseño

- Patrón Repositorio
- Inyección de Dependencias
- Patrón DTO
- Patrón Adaptador
- Patrón Fábrica
- Patrón Singleton (para servicios)

## Stack Tecnológico

- NestJS (Framework de Node.js)
- TypeScript
- Express
- Firebase Functions
- Swagger/OpenAPI
- Class Validator & Transformer
- Autenticación JWT

## Documentación de la API (Swagger)

### Endpoints de Swagger

Puedes acceder a la documentación Swagger en:
- Desarrollo: `http://localhost:3000/api/docs`
- Producción: [https://task-api-bemoba.fly.dev/api/docs](https://task-api-bemoba.fly.dev/api/docs)

### Autenticación

La API utiliza autenticación por token Bearer. Para acceder a los endpoints protegidos:
1. Primero, regístrate o inicia sesión para obtener un token JWT
2. Haz clic en el botón "Authorize" en la interfaz de Swagger
3. Ingresa tu token en el formato: `Bearer tu_token_jwt`

### Endpoints Disponibles

#### Autenticación
```
POST /api/auth/register - Registrar nuevo usuario
POST /api/auth/login    - Iniciar sesión
```

#### Usuarios
```
GET    /api/users/profile   - Obtener perfil del usuario actual
PATCH  /api/users/profile   - Actualizar perfil de usuario
DELETE /api/users/profile   - Eliminar cuenta de usuario
```

#### Tareas
```
GET    /api/tasks          - Listar todas las tareas
POST   /api/tasks          - Crear nueva tarea
GET    /api/tasks/:id      - Obtener detalles de una tarea
PATCH  /api/tasks/:id      - Actualizar tarea
DELETE /api/tasks/:id      - Eliminar tarea
```

### Ejemplos de Peticiones/Respuestas

#### Petición de Creación de Tarea
```json
{
  "title": "Implementar autenticación",
  "description": "Usar JWT para sesiones de usuario",
  "isPending": true,
  "priority": "HIGH",
  "dueDate": "2025-06-30T23:59:59Z",
  "isArchived": false
}
```

#### Respuesta de Tarea
```json
{
  "statusCode": 200,
  "data": {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "creatorId": "9b2d32c7-a843-4a3b-bbbb-0a67adfd93ec",
    "title": "Implementar autenticación",
    "description": "Usar JWT para sesiones de usuario",
    "isPending": true,
    "priority": "HIGH",
    "dueDate": "2025-06-30T23:59:59Z",
    "isArchived": false,
    "createdAt": "2024-03-19T15:32:10.123Z",
    "updatedAt": "2024-03-19T15:32:10.123Z"
  },
  "message": "Tarea creada exitosamente",
  "timestamp": "2024-03-19T15:32:10.123Z"
}
```

#### Respuesta de Error
```json
{
  "statusCode": 400,
  "message": "Datos de entrada inválidos",
  "error": "Bad Request",
  "timestamp": "2024-03-19T15:32:10.123Z"
}
```

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd task-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Variables de entorno requeridas:
```env
PORT=3000
JWT_SECRET=tu_secreto_jwt
FIREBASE_PROJECT_ID=tu_id_proyecto_firebase
```

## Ejecutar la Aplicación

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## Seguridad

- Autenticación JWT
- Validación de Peticiones
- Protección CORS
- Sanitización de Entrada
- Manejo de Errores

## Manejo de Errores

La API utiliza un filtro global (`ApiFailedResponseFilter`) para manejar excepciones y devolver respuestas de error estandarizadas:

```typescript
{
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}
```

## Interceptor de Respuesta

Todas las respuestas exitosas se envuelven en un formato estándar usando `ResponseInterceptor`:

```typescript
{
  statusCode: number;
  data: T;
  message: string;
  timestamp: string;
}
```

## Contribuir

1. Haz un fork del repositorio
2. Crea tu rama de características
3. Realiza tus cambios
4. Envía un pull request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
