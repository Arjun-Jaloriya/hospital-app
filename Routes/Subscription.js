const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addSubscription,getSubscriptions ,updateSubscription,getSubscription} = require("../Controllers/Subscription");
const subscriptionRouter = express.Router();

subscriptionRouter.post("/add", issignin, addSubscription);
subscriptionRouter.get("/",issignin,getSubscriptions);
subscriptionRouter.get("/:id",issignin,getSubscription);
subscriptionRouter.put("/update",issignin,updateSubscription);

module.exports = subscriptionRouter;
