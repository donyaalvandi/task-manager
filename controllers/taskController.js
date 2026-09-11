const fs = require("fs");
const path = require("path");


const tasksFilePath = path.join(__dirname, "../data/tasks.json");

const readTasksFromFile = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};


const writeTasksToFile = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
};

const findTaskIndex = (tasks, id) => {
  return tasks.findIndex(task => task.id === id);
};


const getAllTasks = (req, res) => {
  const tasks = readTasksFromFile();


  const { completed, search } = req.query;

  let filteredTasks = tasks;


  if (completed !== undefined) {
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
  const tasks = readTasksFromFile();
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

const createTask = (req, res) => {
  const { title, attachmentPath } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const tasks = readTasksFromFile();
  const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);

  const newTask = {
    id: maxId + 1,
    title: title,
    completed: false,
    createdAt: new Date().toISOString(),
    attachmentPath: attachmentPath || null
  };

  tasks.push(newTask);
  writeTasksToFile(tasks);

  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed, attachmentPath } = req.body;

  const tasks = readTasksFromFile();
  const index = findTaskIndex(tasks, id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (title !== undefined) tasks[index].title = title;
  if (completed !== undefined) tasks[index].completed = completed;
  if (attachmentPath !== undefined) tasks[index].attachmentPath = attachmentPath;

  writeTasksToFile(tasks);
  res.json(tasks[index]);
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  const tasks = readTasksFromFile();
  const index = findTaskIndex(tasks, id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  writeTasksToFile(tasks);

  res.json({ message: "Task deleted successfully", task: deletedTask[0] });
};


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
