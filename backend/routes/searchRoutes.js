import express from "express";
import Item from "../models/Item.js"; // adjust to your schema name

const router = express.Router();

// Suggestions (for instant search)
router.get("/suggestions", async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query.trim()) return res.json([]);
    const results = await Item.find(
      { name: { $regex: query, $options: "i" } },
      "name"
    ).limit(5);
    res.json(results);
  } catch (err) {
    console.error("Suggestion error:", err);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});

// Full search
router.get("/", async (req, res) => {
  try {
    const query = req.query.q || "";
    if (!query.trim()) return res.json([]);
    const results = await Item.find({
      name: { $regex: query, $options: "i" },
    }).limit(20);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Error fetching results" });
  }
});

export default router;
