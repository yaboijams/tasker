const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRoutes);

module.exports = app;
