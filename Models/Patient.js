const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    PNO: { type: String,required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = { Patient };
