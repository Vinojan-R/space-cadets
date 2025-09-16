const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  badges: [{ type: String }], // Array to store badge URLs or names
});

module.exports = mongoose.model("User", userSchema);