const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.ObjectId, ref: "Patient" },
    caseType: {
      type: String,
      enum: ["NEW", "FOLLOWUP"],
      required: true,
    },
    fees: { type: Number },
    healthDetails: {},
    healthIssues: { type: String },
    priscription: [],
    hospitalId: { type: mongoose.ObjectId, ref: "Hospital" },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = { Appointment };
