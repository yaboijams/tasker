// models/List.js
const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    // References to cards in this list
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
