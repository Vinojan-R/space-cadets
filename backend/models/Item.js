import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  link: String, // Optional: for “View more” navigation
});

export default mongoose.model("Item", itemSchema);
