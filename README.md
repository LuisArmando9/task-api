# Task Management API

A RESTful API built with NestJS for managing tasks with user authentication.

## Features

- User Management (Authentication & Authorization)
- Task CRUD Operations
- Task Status and Priority Management
- Task Filtering and Sorting
- Swagger Documentation
- Firebase Integration

## Tech Stack

- NestJS
- TypeScript
- Express
- Firebase Functions
- Swagger/OpenAPI
- Class Validator
- JWT Authentication

## Project Structure

```
src/
├── core/                 # Core functionality (filters, interceptors)
├── user/                 # User module
│   ├── core/            # User domain logic
│   ├── infrastructure/  # User implementations
│   └── application/     # User use cases
├── task/                # Task module
│   ├── core/           # Task domain logic
│   ├── infrastructure/ # Task implementations
│   └── application/    # Task use cases
└── main.ts             # Application entry point
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

## API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:3000/api/docs
```

## Available Endpoints

### User Endpoints
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile

### Task Endpoints
- GET /api/tasks - List all tasks
- POST /api/tasks - Create new task
- GET /api/tasks/:id - Get task details
- PATCH /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

## Controllers

### UserController
- Handles user registration and authentication
- Manages user profiles
- JWT token generation and validation

### TaskController
- Manages CRUD operations for tasks
- Handles task filtering and sorting
- Implements task status updates

## Services

### UserService
- User creation and management
- Password hashing and verification
- Profile management

### TaskService
- Task creation and management
- Task status updates
- Task filtering and querying

## Data Transfer Objects (DTOs)

### User DTOs
- CreateUserDto
- UpdateUserDto
- LoginUserDto

### Task DTOs
- CreateTaskDto
- UpdateTaskDto
- TaskDto

## Environment Variables

```env
PORT=3000
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
