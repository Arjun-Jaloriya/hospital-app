const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { addSubscription,getSubscriptions ,updateSubscription,getSubscription,deleteSubscription} = require("../Controllers/Subscription");
const subscriptionRouter = express.Router();

subscriptionRouter.post("/add", issignin, addSubscription);
subscriptionRouter.get("/",issignin,getSubscriptions);
subscriptionRouter.get("/:id",issignin,getSubscription);
subscriptionRouter.put("/update/:id",issignin,updateSubscription);
subscriptionRouter.delete("/delete/:id",issignin,deleteSubscription);

module.exports = subscriptionRouter;
