# Task Management API

A RESTful API built with NestJS for managing tasks with user authentication.

## Live API Documentation

The API is deployed and accessible at:
- Live Swagger Documentation: [https://task-api-bemoba.fly.dev/api/docs](https://task-api-bemoba.fly.dev/api/docs)
- Base API URL: `https://task-api-bemoba.fly.dev`

## Features

- User Management (Authentication & Authorization)
- Task CRUD Operations
- Task Status and Priority Management
- Task Filtering and Sorting
- Swagger Documentation
- Firebase Integration
- CORS Enabled
- Validation Pipes
- Global Response Interceptor
- Error Handling Filter

## Architecture

### Clean Architecture

This project follows Clean Architecture principles, separating the code into layers:

```
src/
├── core/                          # Core functionality
│   ├── filters/                   # Global error filters
│   └── interceptors/             # Response interceptors
│
├── user/                         # User module
│   ├── core/                     # Domain layer
│   │   ├── domain/              
│   │   │   ├── models/          # Domain models
│   │   │   └── interfaces/      # Domain interfaces
│   │   └── use-cases/          # Application use cases
│   ├── infrastructure/          # Infrastructure layer
│   │   ├── adapters/           # External adapters
│   │   └── repositories/       # Data repositories
│   └── application/            # Application layer
│       ├── controllers/        # HTTP controllers
│       └── services/          # Application services
│
├── task/                        # Task module
│   ├── core/                   # Domain layer
│   │   ├── domain/
│   │   │   ├── models/        # Task domain models
│   │   │   ├── enums/         # Task enums
│   │   │   └── interfaces/    # Task interfaces
│   │   └── use-cases/        # Task use cases
│   ├── infrastructure/        # Infrastructure layer
│   │   ├── adapters/         # External adapters
│   │   │   └── dtos/        # Data transfer objects
│   │   └── repositories/     # Task repositories
│   └── application/          # Application layer
│       ├── controllers/      # Task controllers
│       └── services/        # Task services
│
└── main.ts                    # Application entry point
```

### Design Patterns

- Repository Pattern
- Dependency Injection
- DTO Pattern
- Adapter Pattern
- Factory Pattern
- Singleton Pattern (for services)

## Tech Stack

- NestJS (Node.js framework)
- TypeScript
- Express
- Firebase Functions
- Swagger/OpenAPI
- Class Validator & Transformer
- JWT Authentication

## API Documentation (Swagger)

### Swagger Endpoints

You can access the Swagger documentation at:
- Development: `http://localhost:3000/api/docs`
- Production: [https://task-api-bemoba.fly.dev/api/docs](https://task-api-bemoba.fly.dev/api/docs)

### Authentication

The API uses Bearer token authentication. To access protected endpoints:
1. First, register or login to obtain a JWT token
2. Click the "Authorize" button in Swagger UI
3. Enter your token in the format: `Bearer your_jwt_token`

### Available Endpoints

#### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

#### Users
```
GET    /api/users/profile   - Get current user profile
PATCH  /api/users/profile   - Update user profile
DELETE /api/users/profile   - Delete user account
```

#### Tasks
```
GET    /api/tasks          - List all tasks
POST   /api/tasks          - Create new task
GET    /api/tasks/:id      - Get task details
PATCH  /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
```

### Request/Response Examples

#### Create Task Request
```json
{
  "title": "Implement authentication",
  "description": "Use JWT for user login sessions",
  "isPending": true,
  "priority": "HIGH",
  "dueDate": "2025-06-30T23:59:59Z",
  "isArchived": false
}
```

#### Task Response
```json
{
  "statusCode": 200,
  "data": {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "creatorId": "9b2d32c7-a843-4a3b-bbbb-0a67adfd93ec",
    "title": "Implement authentication",
    "description": "Use JWT for user login sessions",
    "isPending": true,
    "priority": "HIGH",
    "dueDate": "2025-06-30T23:59:59Z",
    "isArchived": false,
    "createdAt": "2024-03-19T15:32:10.123Z",
    "updatedAt": "2024-03-19T15:32:10.123Z"
  },
  "message": "Task created successfully",
  "timestamp": "2024-03-19T15:32:10.123Z"
}
```

#### Error Response
```json
{
  "statusCode": 400,
  "message": "Invalid input data",
  "error": "Bad Request",
  "timestamp": "2024-03-19T15:32:10.123Z"
}
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
```env
PORT=3000
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Endpoints

### User Endpoints
```
POST /api/users/register - Register new user
POST /api/users/login    - User login
GET  /api/users/profile - Get user profile
```

### Task Endpoints
```
GET    /api/tasks        - List all tasks
POST   /api/tasks        - Create new task
GET    /api/tasks/:id    - Get task details
PATCH  /api/tasks/:id    - Update task
DELETE /api/tasks/:id    - Delete task
```

## Security

- JWT Authentication
- Request Validation
- CORS Protection
- Input Sanitization
- Error Handling

## Error Handling

The API uses a global filter (`ApiFailedResponseFilter`) to handle exceptions and return standardized error responses:

```typescript
{
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}
```

## Response Interceptor

All successful responses are wrapped in a standard format using `ResponseInterceptor`:

```typescript
{
  statusCode: number;
  data: T;
  message: string;
  timestamp: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
