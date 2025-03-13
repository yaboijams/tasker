// models/Board.js
const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    // References to lists on the board
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    // Optionally, include an owner or members field for collaboration
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", BoardSchema);
