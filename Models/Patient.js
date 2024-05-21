const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    healthDetails: [
      {
        age: { type: Number, required: true },
        weight: { type: Number, required: true },
        bp: { type: Number },
        date: { type: Date, default: new Date() },
      },
    ],
    healthIssues: [
      {
        description: { type: {} },
        prescription: [
          {
            medicines: { type: String },
            dose: { type: {} },
            description: { type: {} },
            date: { type: Date, default: new Date() },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = { Patient };
