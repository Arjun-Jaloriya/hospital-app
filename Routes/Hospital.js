const express = require("express");
const hospitalRouter = express.Router();
const { issignin } = require("../Middleware/Auth");
const {
  addHospital,
  getHospitals,
  updateHospital,
  deleteHospital,
  updateStatusForHospital,
} = require("../Controllers/Hospital");

hospitalRouter.post("/add", issignin, addHospital);
hospitalRouter.get("/getHospitals", issignin, getHospitals);
hospitalRouter.put("/update/:id", issignin, updateHospital);
hospitalRouter.delete("/delete/:id",issignin,deleteHospital);
hospitalRouter.put("/updateStatus",issignin,updateStatusForHospital);

module.exports = hospitalRouter;
