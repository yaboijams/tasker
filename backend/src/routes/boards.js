const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");

// GET all boards
router.get("/", boardsController.getAllBoards);

// POST create a new board
router.post("/", boardsController.createBoard);

// PUT update a board by ID
router.put("/:id", boardsController.updateBoard);

// DELETE a board by ID
router.delete("/:id", boardsController.deleteBoard);

module.exports = router;
