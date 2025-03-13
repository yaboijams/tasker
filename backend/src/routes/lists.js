const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");

// GET all lists
router.get("/", listsController.getAllLists);

// POST create a new list
router.post("/", listsController.createList);

// PUT update a list by ID
router.put("/:id", listsController.updateList);

// DELETE a list by ID
router.delete("/:id", listsController.deleteList);

module.exports = router;
