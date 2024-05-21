const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const PORT = 4040 || process.env.PORT;
require("./Config/db");
const envFile =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";
require("dotenv").config({ path: envFile });
const AuthRouter = require(".//Routes/AuthRoutes");
const medicineRouter = require("./Routes/medicineRoute");
const patientRouter = require("./Routes/patient");
const hospitalRouter = require("./Routes/Hospital");
const receptionRouter = require("./Routes/Reception");

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api/auth", AuthRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/patient", patientRouter);
app.use("/api/hospital",hospitalRouter);
app.use("/api/reception",receptionRouter);

app.listen(PORT, () => {
  console.log(`app is live at PORT ${PORT}`);
});
