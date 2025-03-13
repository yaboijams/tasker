const express = require("express");
const router = express.Router();
const cardsController = require("../controllers/cardsController");

// GET all cards
router.get("/", cardsController.getAllCards);

// POST create a new card
router.post("/", cardsController.createCard);

// PUT update a card by ID
router.put("/:id", cardsController.updateCard);

// DELETE a card by ID
router.delete("/:id", cardsController.deleteCard);

module.exports = router;
