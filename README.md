# Project 3 — Student Database Manager

A complete beginner-friendly database integration project aligned with the DecodeLabs Project 3 brief. It demonstrates schema design, backend/database connection, CRUD operations, REST endpoints, validation, constraints and safe database access.

## Technology
- Frontend: React + Vite
- Backend: Java 17 + Spring Boot + Spring Data JPA
- Database: PostgreSQL 16

## Requirements
- Java 17 or later
- Maven 3.8+
- Node.js 18+
- Docker Desktop (recommended) or a local PostgreSQL installation

## 1. Start PostgreSQL
From the project root:

```bash
docker compose up -d
```

This creates database `project3db`, username `postgres`, password `postgres`, on port `5432`.

## 2. Start the backend
Open a terminal:

```bash
cd backend
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`.

Default database settings are in `backend/src/main/resources/application.properties`. Override them with `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` environment variables if needed. Hibernate creates/updates the `students` table automatically for this training project.

## 3. Start the frontend
Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## CRUD API
Base URL: `http://localhost:8080/api/students`

| Operation | Method | Endpoint | Purpose |
|---|---|---|---|
| Create | POST | `/api/students` | Add a student |
| Read all | GET | `/api/students` | List students |
| Read one | GET | `/api/students/{id}` | Get one student |
| Update | PUT | `/api/students/{id}` | Update a student |
| Delete | DELETE | `/api/students/{id}` | Delete a student |

Example POST body:

```json
{
  "name": "Aarav Patil",
  "email": "aarav@example.com",
  "course": "Computer Science",
  "semester": 6
}
```

## Database design
`students` has these columns:

- `id`: generated primary key
- `name`: required, up to 80 characters
- `email`: required and unique
- `course`: required, up to 80 characters
- `semester`: required; valid range 1–8

The SQL reference schema is in `database-schema.sql`. The application uses JPA/Hibernate to create/update the table when it starts.

## How the architecture works

```text
React UI (localhost:5173)
        | HTTP / JSON
        v
Spring Boot REST Controller (localhost:8080)
        v
Student Service (business rules)
        v
Spring Data JPA Repository (ORM)
        v
PostgreSQL Database (localhost:5432)
```

## Test with curl

Create:
```bash
curl -X POST http://localhost:8080/api/students -H "Content-Type: application/json" -d '{"name":"Aarav Patil","email":"aarav@example.com","course":"Computer Science","semester":6}'
```

Read:
```bash
curl http://localhost:8080/api/students
```

Update:
```bash
curl -X PUT http://localhost:8080/api/students/1 -H "Content-Type: application/json" -d '{"name":"Aarav P","email":"aarav@example.com","course":"Computer Science","semester":7}'
```

Delete:
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

## Project 3 checklist
- [x] Simple relational database schema
- [x] Primary key and unique email constraint
- [x] NOT NULL and semester range validation
- [x] Backend-to-database integration
- [x] Create, Read, Update and Delete
- [x] REST mapping: POST, GET, PUT, DELETE
- [x] ORM integration using Spring Data JPA
- [x] Input validation and error responses
- [x] Frontend interface for CRUD operations

## Security and learning notes
- Spring Data JPA uses parameterized database operations; do not build SQL by concatenating raw user input.
- This is a learning project, not a production deployment. Before production, add authentication/authorization, stronger configuration and secret management, database migrations (for example Flyway), pagination, logging and automated tests.
- CORS currently permits the local Vite development origin only.
