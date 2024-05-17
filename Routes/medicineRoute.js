const express = require("express");
const {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
} = require("../Controllers/Medicine");

const { issignin } = require("../Middleware/Auth");
const medicineRouter = express.Router();

medicineRouter.get("/getMedicines", issignin, getMedicines);
medicineRouter.get("/getMedicine/:id", issignin, getMedicine);
medicineRouter.post("/create", issignin, addMedicine);
medicineRouter.put("/update/:id", issignin, updateMedicine);
medicineRouter.delete("/delete/:id", issignin, deleteMedicine);

module.exports = medicineRouter;
