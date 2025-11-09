// routes/leaderboardRoutes.js
import express from "express";
import User from "../models/User.js"; // make sure this path is correct

const router = express.Router();

// Example leaderboard route
router.get("/", async (req, res) => {
  try {
    // Assuming your User model has a "score" field
    const leaderboard = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("username score");

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
});

export default router;
