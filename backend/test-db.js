require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGO_URI);
const { connectToDatabase } = require('./src/config/database');
const mongoose = require("mongoose");

// Optional: Define a simple model to test the connection (adjust the schema as needed)
const testSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model("Test", testSchema);

async function testConnection() {
  await connectToDatabase();  // This should print "Connected to MongoDB"

  // Create a test document`
  const testDoc = new TestModel({ name: "Database Test" });
  await testDoc.save();
  console.log("Test document saved:", testDoc);

  // Fetch the document
  const fetchedDoc = await TestModel.findOne({ name: "Database Test" });
  console.log("Fetched test document:", fetchedDoc);

  // Optionally, clean up the test document
  await TestModel.deleteOne({ _id: testDoc._id });
  console.log("Test document removed.");

  process.exit(0);
}

testConnection().catch(error => {
  console.error("Error during test connection:", error);
  process.exit(1);
});
