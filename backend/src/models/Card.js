// models/Card.js
const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    // 'order' helps to keep track of card positioning within a list
    order: { type: Number, default: 0 },
    dueDate: Date,
    labels: [String],
    // Other fields as needed, such as assigned user, comments, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
