const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: { type: String, unique: true, unique: true },
    password: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: {},
      required: true,
    },
    role: { type: Number, default: 0 },
    token: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    startdate: { type: Date },
    enddate: { type: Date },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    receptionId: { type: mongoose.ObjectId, ref: "Reception" },
    pharmacyId: { type: mongoose.ObjectId, ref: "Pharmacy" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
