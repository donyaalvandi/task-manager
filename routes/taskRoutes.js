const express = require("express");
const router = express.Router();
const validator = require("express-validator");

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  replaceTask,
  deleteTask,
  toggleTask,
} = require("../controllers/taskController");


const createTaskValidation = [
  validator
    .body("title")
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("title must be between 1 and 100 characters"),
  validator
    .body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed must be a boolean"),
  validator
    .body("attachmentPath")
    .optional()
    .isString()
    .withMessage("attachmentPath must be a string")
];


const updateTaskValidation = [
  validator
    .body("title")
    .optional()
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("title must be between 1 and 100 characters"),
  validator
    .body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed must be a boolean"),
  validator
    .body("attachmentPath")
    .optional()
    .isString()
    .withMessage("attachmentPath must be a string")
];

router.get("/", getAllTasks);
router.post("/", createTaskValidation, createTask);
router.patch("/:id/toggle", toggleTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTaskValidation, replaceTask);
router.patch("/:id", updateTaskValidation, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
