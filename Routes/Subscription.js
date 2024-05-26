const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addSubscription } = require("../Controllers/Subscription");
const subcriptionRouter = express.Router();

subcriptionRouter.post("/add", issignin, addSubscription);

module.exports = subcriptionRouter;
