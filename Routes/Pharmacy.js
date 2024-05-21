const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addReception } = require("../Controllers/Reception");
const pharmacyRouter = express.Router();

pharmacyRouter.post("/add", issignin, addReception);
pharmacyRouter.get("/getPharmacy", issignin, getReception);
pharmacyRouter.delete("/delete", issignin, deleteReception);

module.exports = pharmacyRouter;