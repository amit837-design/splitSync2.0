const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.DB_URL, {
    bufferCommands: false,
  });
  isConnected = true;
  console.log("MongoDB connected");
}

module.exports = connectDB;
