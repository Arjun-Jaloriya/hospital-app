const mongoose = require("mongoose");
const envFile =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";

// Load environment variables from the appropriate .env file
require("dotenv").config({ path: envFile });

const uri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    return console.error("Error connecting to MongoDB:", error);
  });
