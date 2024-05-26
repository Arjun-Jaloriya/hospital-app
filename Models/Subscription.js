const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    month: { type: Number, required: true },
  },
  { timestamps: true }
);
const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = { Subscription };
