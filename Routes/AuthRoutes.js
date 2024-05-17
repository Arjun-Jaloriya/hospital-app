const express = require("express");
const AuthRouter = express.Router();
const {Register,Login} = require("../Controllers/Auth");
const { issignin } = require("../Middleware/Auth");

AuthRouter.post("/register",Register);
AuthRouter.get("/login",Login);
AuthRouter.get("/profile",issignin,profileToken);

module.exports = AuthRouter;