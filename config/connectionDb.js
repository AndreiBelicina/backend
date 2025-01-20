const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI; // Ensure this matches the variable name in your environment
    if (!uri) {
      throw new Error("MongoDB connection URI is not defined in the environment variables.");
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if the connection fails
  }
};

module.exports = connectDb;
