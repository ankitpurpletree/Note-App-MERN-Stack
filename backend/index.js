// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to mongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const app = express();

// // to make input as json
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// // import routes
// import authRouter from "./routes/auth.route.js";
// import noteRouter from "./routes/note.route.js";

// app.use("/api/auth", authRouter);
// app.use("/api/note", noteRouter);

// // error handling
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Serer Error";

//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Import routes
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
