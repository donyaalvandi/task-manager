const fs = require("fs");
const path = require("path");
const validator = require("express-validator");
const { customError } = require("../utils/errorHandler");

const tasksFilePath = path.join(__dirname, "../data/tasks.json");

// ==================== Helper Functions ====================

const readTasksFromFile = () => {
  if (!fs.existsSync(tasksFilePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read tasks file:", error.message);
    const readError = new Error("Failed to read tasks data");
    readError.statusCode = 500;
    throw readError;
  }
};

const writeTasksToFile = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
};

const findTaskIndex = (tasks, id) => {
  return tasks.findIndex(task => task.id === id);
};

// ==================== Controllers ====================

const getAllTasks = (req, res) => {
  const tasks = readTasksFromFile();
  const { completed, search } = req.query;
  let filteredTasks = tasks;

  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      return res.status(400).json({
        status: 400,
        message: "Query param 'completed' must be 'true' or 'false'",
      });
    }
    const isCompleted = completed === "true";
    filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchLower)
    );
  }

  res.json(filteredTasks);
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Task ID must be a valid number",
    });
  }

  const tasks = readTasksFromFile();
  const task = tasks.find(task => task.id === id);

  if (!task) {
    customError("Task not found", 404);
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const responseTask = {
    ...task,
    attachmentUrl: task.attachmentPath
      ? `${baseUrl}/files/${task.attachmentPath}`
      : null,
  };

  res.json(responseTask);
};

const createTask = (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      errors: errors.array()
    });
  }

  const { title, completed, attachmentPath } = req.body;   // ← تغییر ۱

  const tasks = readTasksFromFile();
  const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);

  const newTask = {
    id: maxId + 1,
    title: title,
    completed: completed === undefined ? false : completed,  // ← تغییر ۲
    createdAt: new Date().toISOString(),
    attachmentPath: attachmentPath || null
  };

  tasks.push(newTask);
  writeTasksToFile(tasks);

  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      errors: errors.array()
    });
  }

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Task ID must be a valid number",
    });
  }

  const { title, completed, attachmentPath } = req.body;

  const tasks = readTasksFromFile();
  const index = findTaskIndex(tasks, id);

  if (index === -1) {
    customError("Task not found", 404);
  }

  if (title !== undefined) tasks[index].title = title;
  if (completed !== undefined) tasks[index].completed = completed;
  if (attachmentPath !== undefined) tasks[index].attachmentPath = attachmentPath;

  writeTasksToFile(tasks);
  res.json(tasks[index]);
};

const replaceTask = (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      errors: errors.array(),
    });
  }

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Task ID must be a valid number",
    });
  }

  const { title, completed, attachmentPath } = req.body;

  if (title === undefined) {
    return res.status(422).json({
      status: 422,
      message: "title is required for PUT (full replacement)",
    });
  }

  const tasks = readTasksFromFile();
  const index = findTaskIndex(tasks, id);

  if (index === -1) {
    customError("Task not found", 404);
  }

  tasks[index] = {
    id: tasks[index].id,
    title: title,
    completed: completed === undefined ? false : completed,
    createdAt: tasks[index].createdAt,
    attachmentPath: attachmentPath === undefined ? null : attachmentPath,
  };

  writeTasksToFile(tasks);
  res.json(tasks[index]);
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Task ID must be a valid number",
    });
  }

  const tasks = readTasksFromFile();
  const index = findTaskIndex(tasks, id);

  if (index === -1) {
    customError("Task not found", 404);
  }

  const deletedTask = tasks.splice(index, 1);
  writeTasksToFile(tasks);

  res.json({ message: "Task deleted successfully", task: deletedTask[0] });
};

const toggleTask = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      message: "Task ID must be a valid number",
    });
  }

  const tasks = readTasksFromFile();
  const index = findTaskIndex(tasks, id);

  if (index === -1) {
    customError("Task not found", 404);
  }


  tasks[index].completed = !tasks[index].completed;

  writeTasksToFile(tasks);
  res.json(tasks[index]);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  replaceTask,
  deleteTask,
  toggleTask,
};
