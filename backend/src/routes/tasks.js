const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// GET all tasks
router.get("/", tasksController.getAllTasks);

// POST create a new task
router.post("/", tasksController.createTask);

// Additional routes: PUT to update, DELETE to remove, etc.

module.exports = router;
