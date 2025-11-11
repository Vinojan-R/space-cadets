import express from "express";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Helper to get YYYY-MM-DD string in UTC
const toISODate = (d = new Date()) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("streakDays lastClaim xp");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      streakDays: user.streakDays || 0,
      lastClaim: user.lastClaim ? user.lastClaim.toISOString() : null,
      xp: user.xp || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Claim today's streak
router.put("/claim", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const todayISO = toISODate();
    const lastISO = user.lastClaim ? toISODate(user.lastClaim) : null;

    if (lastISO === todayISO) {
      return res.status(400).json({ message: "Already claimed today", streakDays: user.streakDays || 0, xp: user.xp || 0 });
    }

    // if last claimed yesterday -> continue streak else reset
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayISO = toISODate(yesterday);

    let newStreak = 1;
    if (lastISO === yesterdayISO) newStreak = (user.streakDays || 0) + 1;

    const XP_PER_CLAIM = 50;
    user.streakDays = newStreak;
    user.lastClaim = new Date(); // now
    user.xp = (user.xp || 0) + XP_PER_CLAIM;

    await user.save();

    res.json({ message: "Claimed", streakDays: user.streakDays, xp: user.xp, lastClaim: user.lastClaim });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;