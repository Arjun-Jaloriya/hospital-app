const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: {}, required: true },
    role: { type: Number, default: 3 },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
module.exports = { Pharmacy };
