const express = require("express");
const { issignin } = require("../Middleware/Auth");
const {
  addPharmacy,
  getPharmacies,
  deletePharmacy,
} = require("../Controllers/Pharmacy");

const pharmacyRouter = express.Router();

pharmacyRouter.post("/add", issignin, addPharmacy);
pharmacyRouter.get("/getPharmacies", issignin, getPharmacies);
pharmacyRouter.delete("/delete/:id", issignin, deletePharmacy);

module.exports = pharmacyRouter;
