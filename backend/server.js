const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// Leaderboard API
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10); // Limit to top 10 players
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Update username
app.put("/api/settings/username", async (req, res) => {
  const { userId, newUsername } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { username: newUsername });
    res.json({ message: "Username updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update username" });
  }
});

// Update password
app.put("/api/settings/password", async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { password: newPassword });
    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

// Delete account
app.delete("/api/settings/delete", async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: "Account deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
});

// Update profile picture
app.put("/api/settings/profile-picture", async (req, res) => {
  const { userId, profilePicture } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { profilePicture });
    res.json({ message: "Profile picture updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile picture" });
  }
});

// Fetch login activity
app.get("/api/settings/login-activity/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json(user.loginActivity || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch login activity" });
  }
});

// Update learning reminders
app.put("/api/settings/reminders", async (req, res) => {
  const { userId, reminders } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { reminders });
    res.json({ message: "Learning reminders updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update reminders" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
