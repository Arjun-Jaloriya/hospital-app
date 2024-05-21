const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: {}, required: true },
    role: { type: Number, default: 1 },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    startdate: { type: Date },
    enddate: { type: Date},
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = { Hospital };
