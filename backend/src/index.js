require("dotenv").config();          // Load environment variables from .env
const { connectToDatabase } = require("./config/database");
const app = require("./app");

const PORT = process.env.PORT || 3001;

async function startServer() {
  await connectToDatabase();        // Connect to MongoDB
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
