# Task Management API

A RESTful API built with NestJS for managing tasks with user authentication.

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

### Swagger Configuration

The API documentation is automatically generated using Swagger/OpenAPI. Access it at:
```
http://localhost:3000/api/docs
```

### Available DTOs

#### Task DTOs

```typescript
// CreateTaskDto
{
  title: string;          // Example: "Implement authentication"
  description?: string;   // Example: "Use JWT for user login sessions"
  isPending: boolean;     // Example: true
  priority: TaskPriority; // Example: "HIGH"
  dueDate?: string;      // Example: "2025-06-30T23:59:59Z"
  isArchived?: boolean;  // Example: false
}

// UpdateTaskDto
{
  title?: string;         // Example: "Update Swagger docs"
  description?: string;   // Example: "Add examples to DTOs"
  isPending?: boolean;    // Example: true
  priority?: TaskPriority;// Example: "MEDIUM"
  dueDate?: string;      // Example: "2025-07-15T12:00:00Z"
  isArchived?: boolean;  // Example: true
}

// TaskDto
{
  id: string;            // UUID Example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
  creatorId: string;     // UUID Example: "9b2d32c7-a843-4a3b-bbbb-0a67adfd93ec"
  // ... other properties from CreateTaskDto
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
