# Task Manager API Design

## 1. Task Structure
Each task has the following fields:
- `id` (unique identifier)
- `title` (task title)
- `completed` (boolean status)
- `createdAt` (creation date)

## 2. API Routes

| Method | Path | Purpose | Success | Failure |
|--------|------|---------|---------|---------|
| GET | `/api/tasks` | Get all tasks (filter, search, pagination) | 200 | 400 |
| GET | `/api/tasks/:id` | Get a specific task | 200 | 400, 404 |
| POST | `/api/tasks` | Create a new task | 201 | 422 |
| PUT | `/api/tasks/:id` | Replace a task (full) | 200 | 400, 404, 422 |
| PATCH | `/api/tasks/:id` | Update a task (partial) | 200 | 400, 404, 422 |
| PATCH | `/api/tasks/:id/toggle` | Toggle completed | 200 | 400, 404 |
| DELETE | `/api/tasks/:id` | Delete a task | 200 | 400, 404 |

## 3. Folder Structure


## 3. Folder Structure

task-manager/
├── .postman/
│   └── resources.yaml
├── controllers/
│   └── taskController.js
├── data/
│   └── tasks.json
├── node_modules/              (ignored by git)
├── postman/
│   ├── collections/
│   │   └── Task Manager API/
│   │       ├── Get All Tasks.request.yaml
│   │       ├── Get Task by ID.request.yaml
│   │       ├── Create Task.request.yaml
│   │       ├── Update Task.request.yaml
│   │       └── Delete Task.request.yaml
│   ├── environments/
│   └── globals/
├── routes/
│   └── taskRoutes.js
├── uploads/
│   └── test.txt
├── utils/
│   └── errorHandler.js
├── .gitignore
├── app.js
├── DESIGN.md
├── package-lock.json
├── package.json
└── Retro.md


## 4. Status Codes

- `200 OK` — Request successful
- `201 Created` — Task successfully created
- `400 Bad Request` — Invalid ID or query param
- `404 Not Found` — Task or route not found
- `422 Unprocessable Entity` — Validation failed
- `500 Internal Server Error` — File I/O or unexpected error
