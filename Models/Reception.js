const mongoose = require("mongoose");

const receptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true,lowercase: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
  },
  { timestamps: true }
);
const Reception = mongoose.model("Reception", receptionSchema);
module.exports = { Reception };
