const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('================================================================');
    console.error('CRITICAL ERROR: MONGO_URI environment variable is not defined!');
    console.error('If you are deploying to Render, you must configure MONGO_URI');
    console.error('in the Render Dashboard Settings under "Environment Variables".');
    console.error('Example: mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/war_economic_impact');
    console.error('================================================================');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
