const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/Task");
const { verifyToken } = require("../middlewares/auth");

// Route to create a new task
router.post("/create", verifyToken,createTask);

// Route to get all tasks
router.get("/get", getAllTasks);

// Route to get a task by ID
router.get("/get/:id", getTaskById);

// Route to update a task by ID
router.put("/update/:id", updateTask);

// Route to delete a task by ID
router.delete("/del/:id", deleteTask);

module.exports = router;
