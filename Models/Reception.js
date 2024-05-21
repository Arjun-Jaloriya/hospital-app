const mongoose = require("mongoose");

const receptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: {}, required: true },
    role: { type: Number, default: 2 },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    startdate: { type: Date },
    enddate: { type: Date },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
const Reception = mongoose.model("Reception", receptionSchema);
module.exports = { Reception };
