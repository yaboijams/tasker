// app.js
const express = require("express");
const cors = require("cors");

// Import route modules (you'll need to create these files)
const tasksRoutes = require("./routes/tasks");
const listsRoutes = require("./routes/lists");
const cardsRoutes = require("./routes/cards");
const boardsRoutes = require("./routes/boards");
const spotifyRoutes = require("./routes/spotify");
const authRoutes = require("./routes/auth");

const app = express();
app.use((req, res, next) => {
  // Replace "your-test-user-id" with a valid MongoDB user ID from your database.
  req.user = { _id: "67edbafb31fd308d17766e83" };
  next();
});
// Middleware
app.use(cors());
app.use(express.json());
// For testing purposes only, add this middleware to simulate an authenticated user.
// app.use((req, res, next) => {
//   // Replace 'your-test-user-id' with an actual user _id from your database, if needed.
//   req.user = { _id: "your-test-user-id" };
//   next();
// });


// Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/lists", listsRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/boards", boardsRoutes);
app.use("/spotify", spotifyRoutes);
app.use("/auth", authRoutes);

// Optional: Basic route to verify the server is running
app.get("/", (req, res) => {
  res.send("Task Manager API is running.");
});

module.exports = app;
