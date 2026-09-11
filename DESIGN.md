# Task Manager API Design

## 1. Task Structure

Each task has the following fields:
- `id` (unique identifier)
- `title` (task title)
- `completed` (boolean status)
- `createdAt` (creation date)

## 2. API Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a specific task |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 3. Folder Structure

```
task-manager/
├── app.js
├── routes/
│   └── taskRoutes.js
├── controllers/
│   └── taskController.js
├── data/
│   └── tasks.js
└── DESIGN.md
```

## 4. Status Codes

- `200 OK` — Request successful
- `201 Created` — Task successfully created
- `400 Bad Request` — Invalid request data
- `404 Not Found` — Requested task does not exist

## 5. Design Questions

### Why separate routes and controllers?

چون روت ها مسیر رو مشخص میکنند ولی در کنترولر ها منطق نوشته میشود پس بهتره برای تمیزی کد این دو را از هم جدا کنیم.

### What should happen if a task does not exist?

باید 404 not found فرستاده شود چون منبع وجود ندارد .
