// backend/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import streakRoutes from "./routes/streaks.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // allows JSON data from frontend

// ✅ API Routes
app.use("/api/auth", authRoutes);          // handles login, register, etc.
app.use("/api/leaderboard", leaderboardRoutes); // handles leaderboard data
app.use("/api/search", searchRoutes);
app.use("/api/streaks", streakRoutes);

// ✅ Health check route (for testing)
app.get("/", (req, res) => {
  res.status(200).send("🌌 Space Cadets Backend is Running Smoothly!");
});

// ✅ 404 Handler (for undefined routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("⚠️ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
