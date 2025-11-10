import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js"; // use named import if middleware exports `auth`

const router = express.Router();
const SALT_ROUNDS = 10;

// Register
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    if (!firstName || !lastName || !username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username taken" });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // store hashed password in the field your User model expects (here: "password")
    const user = await User.create({ firstName, lastName, username, password: passwordHash });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected - current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
