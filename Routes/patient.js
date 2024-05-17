const express = require("express");
const { issignin } = require("../Middleware/Auth");
const {
  getPatients,
  getPatient,
  addPatient,
  updatePatient,
  deletePatient,
} = require("../Controllers/Patients");
const patientRouter = express.Router();

patientRouter.get("/getPatients", issignin, getPatients);
patientRouter.get("/getPatient/:id", issignin, getPatient);
patientRouter.post("/create", issignin, addPatient);
patientRouter.put("/update/:id", issignin, updatePatient);
patientRouter.delete("/delete/:id", issignin, deletePatient);
