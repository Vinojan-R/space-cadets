import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    // use the same field your auth code expects (password or passwordHash)
    // adjust below name if your code expects passwordHash instead
    password: { type: String, required: true },

    // streak / activity fields
    streakDays: { type: Number, default: 0 },
    lastClaim: { type: Date, default: null },
    xp: { type: Number, default: 0 },

    // any other fields you already have
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
