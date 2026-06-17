const mongoose = require('mongoose');

const maskUri = (uri) => {
  if (!uri) return 'undefined';
  return uri.replace(/:([^:@]+)@/, ':******@');
};

const connectDB = async () => {
  const dbUri = process.env.MONGO_URI || process.env.MONGO_URL;

  if (!dbUri) {
    console.error('================================================================');
    console.error('CRITICAL ERROR: Neither MONGO_URI nor MONGO_URL is defined!');
    console.error('If you are deploying to Render, you must configure MONGO_URI');
    console.error('in the Render Dashboard Settings under "Environment Variables".');
    console.error('Example: mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/war_economic_impact');
    console.error('================================================================');
    process.exit(1);
  }

  console.log(`Connecting to DB: ${maskUri(dbUri)}`);

  try {
    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
