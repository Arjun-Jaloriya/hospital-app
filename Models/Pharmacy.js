const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true ,lowercase: true},
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: {}, required: true },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
  },
  { timestamps: true }
);
const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
module.exports = { Pharmacy };
