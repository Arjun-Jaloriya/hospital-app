const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addReception } = require("../Controllers/Reception");
const receptionRouter = express.Router();

receptionRouter.post("/add", issignin, addReception);
// receptionRouter.get("/getReception", issignin, getReception);
// receptionRouter.delete("/delete", issignin, deleteReception);

module.exports = receptionRouter;