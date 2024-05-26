const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addReception,getReceptions,deleteReception } = require("../Controllers/Reception");
const receptionRouter = express.Router();

receptionRouter.post("/add", issignin, addReception);
receptionRouter.get("/getReceptions", issignin, getReceptions);
receptionRouter.delete("/delete/:id", issignin, deleteReception);

module.exports = receptionRouter;