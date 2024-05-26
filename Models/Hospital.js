const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    subscriptionId: { type: mongoose.ObjectId, ref: 'Subscription', required: true }
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = { Hospital };
