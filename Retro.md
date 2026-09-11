# RETRO — Task Manager API

## 1. Looking back at my Stage 1 design

Things I got wrong or underestimated:

- I thought splitting `routes` from `controllers` was just a
  cleanliness thing. In practice I forgot to actually wire the routes
  to the controller functions, so the API did nothing real.
  **Lesson:** after refactoring, always test with a real curl/Postman
  request to confirm the wiring works.

- I made a typo in a data file name: `tasks.jason` instead of
  `tasks.json`. The code pointed to the correct name, but the file on
  disk had the wrong one. **Lesson:** double-check file names right
  after creating them.

- I expected persistence to be harder. `readFileSync` + `writeFileSync`
  got it working quickly — but now I know I have to keep an eye on
  race conditions.

## 2. What I'd do differently next time

- Wire routes to controllers **immediately** after creating the
  controller file, and test right away.
- Keep the DESIGN.md route table in sync with what actually ships.
- Name data files carefully on the first try.
