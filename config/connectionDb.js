const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI; // Ensure this matches your environment variable name
    if (!uri) {
      throw new Error("MongoDB connection URI is not defined in the environment variables.");
    }

    // Optional: Enable strictQuery if working with MongoDB >= 6.0
    mongoose.set('strictQuery', false);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);

    // Retry logic (optional)
    const shouldRetry = process.env.RETRY_ON_FAILURE === 'true';
    if (shouldRetry) {
      console.log("🔄 Retrying MongoDB connection in 5 seconds...");
      setTimeout(connectDb, 5000);
    } else {
      console.log("⛔ Exiting application...");
      process.exit(1);
    }
  }
};

module.exports = connectDb;
