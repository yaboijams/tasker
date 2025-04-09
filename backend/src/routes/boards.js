const express = require("express");
const router = express.Router();
const {createBoard, getAllBoards} = require("../controllers/boardsController");

// GET all boards
router.get("/", getAllBoards);

// POST create a new board
router.post("/createboard", createBoard);

// PUT update a board by ID
// router.put("/:id", boardsController.updateBoard);

// DELETE a board by ID
// router.delete("/:id", boardsController.deleteBoard);

module.exports = router;
