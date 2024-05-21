const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addHospital } = require("../Controllers/Hospital");
const hospitalRouter = express.Router();

hospitalRouter.post("/add",issignin,addHospital);

module.exports = hospitalRouter;