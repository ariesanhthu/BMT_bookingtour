// Import the mongoose library
const mongoose = require('mongoose')

// Define the MongoDB connection string
const DATABASE_URL = process.env.DATABASE_URL || ''

if (!DATABASE_URL) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Define a global variable to cache the connection
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectDB };