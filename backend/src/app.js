// app.js
const express = require("express");
const cors = require("cors");

// Import route modules (you'll need to create these files)
const tasksRoutes = require("./routes/tasks");
const listsRoutes = require("./routes/lists");
const cardsRoutes = require("./routes/cards");
const boardsRoutes = require("./routes/boards");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/lists", listsRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/boards", boardsRoutes);

// Optional: Basic route to verify the server is running
app.get("/", (req, res) => {
  res.send("Task Manager API is running.");
});

module.exports = app;
