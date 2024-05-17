const mongoose = require("mongoose");

const medicinesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    medicineType: { type: String, required: true },
    drug: [{ name: { type: String, required: true } }],
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicinesSchema);
module.exports = { Medicine };
