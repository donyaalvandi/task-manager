const express = require("express");
const router = express.Router();
const validator = require("express-validator");

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// validation برای POST — همه‌ی فیلدها اجباری
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

// validation برای PATCH — همه‌ی فیلدها اختیاری
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
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskValidation, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
