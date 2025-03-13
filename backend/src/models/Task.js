const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, default: "todo" },
    // Add fields like assignedTo, labels, etc. as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
