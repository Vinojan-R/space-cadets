const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const LoginActivitySchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  date: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },

    // Profile
    avatarUrl: { type: String, default: "/src/assets/default-profile.png" },
    bio: { type: String, default: "" },

    // Roles / subscription
    role: { type: String, enum: ["user", "pro", "admin"], default: "user" },
    isPro: { type: Boolean, default: false },

    // Game / app data
    score: { type: Number, default: 0 },       // leaderboard score
    badges: [{ type: String }],                // earned badges

    // Settings
    reminders: { type: String, default: "" },  // simple text reminder setting
    settings: {
      theme: { type: String, default: "dark" },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false },
      },
    },

    // Activity
    loginActivity: [LoginActivitySchema],
  },
  { timestamps: true }
);

// Virtual for full name
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName || ""} ${this.lastName || ""}`.trim();
});

// Hash password before save if modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Helper to compare password
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
