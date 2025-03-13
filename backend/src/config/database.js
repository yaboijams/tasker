const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    // For example, if you store your MongoDB URI in .env as MONGO_URI
    const dbUri =process.env.MONGO_URI || "mongodb://localhost:27017/tasker";
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
}

module.exports = { connectToDatabase };
