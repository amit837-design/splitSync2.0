require("dotenv").config();
const connectDB = require("./src/db/db");
const app = require("./src/app");

const PORT = 3000;

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!:", err.message);
  // not exitting the process here to keep the server alive if possible
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!:", err.message);
});

// 1. Start the Server IMMEDIATELY (So Render sees it is alive)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Attempting to connect to MongoDB...");

  // 2. Connects to Database in the background
  // 3. ConnectDB does not return a promise
  try {
    const dbResult = connectDB();

    if (dbResult && typeof dbResult.then === "function") {
      dbResult
        .then(() => {
          console.log("MongoDB Connected Successfully");
        })
        .catch((err) => {
          console.error("MongoDB Connection Failed (Async):", err.message);
        });
    } else {
      // If it is not a promise, assume it started successfully
      console.log("MongoDB Connection initiated (Sync or Fire-and-Forget)");
    }
  } catch (err) {
    console.error("MongoDB Connection Failed (Sync):", err.message);
  }
});
