const mongoose = require("mongoose");
const medicinesSchema = new mongoose.Schema(
  {
    name: { type: String },
    madicineType: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicinesSchema);
module.exports = { Medicine };
