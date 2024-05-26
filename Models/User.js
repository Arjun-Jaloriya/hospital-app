const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: { type: String, unique: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: { type: String, default: "admin" },
    token: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    receptionId: { type: mongoose.ObjectId, ref: "Reception" },
    pharmacyId: { type: mongoose.ObjectId, ref: "Pharmacy" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
