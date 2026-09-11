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

```
task-manager/
├── app.js
├── routes/
│ └── taskRoutes.js
├── controllers/
│ └── taskController.js
├── utils/
│ └── errorHandler.js
├── data/
│ └── tasks.json
├── uploads/
└── DESIGN.md
```


## 4. Status Codes

- `200 OK` — Request successful
- `201 Created` — Task successfully created
- `400 Bad Request` — Invalid ID or query param
- `404 Not Found` — Task or route not found
- `422 Unprocessable Entity` — Validation failed
- `500 Internal Server Error` — File I/O or unexpected error

## 5. Design Questions

### Why separate routes and controllers?

چون روت ها مسیر رو مشخص میکنند ولی در کنترولر ها منطق نوشته میشود پس بهتره برای تمیزی کد این دو را از هم جدا کنیم.

### What should happen if a task does not exist?

باید 404 not found فرستاده شود چون منبع وجود ندارد .
