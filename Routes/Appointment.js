const express = require("express");
const { issignin } = require("../Middleware/Auth");
const { createAppointment ,getAppointments} = require("../Controllers/Appointment");

const appointmentRouter = express.Router();


appointmentRouter.post("/create",issignin,createAppointment);
appointmentRouter.get("/getAppointments",issignin,getAppointments);

module.exports = appointmentRouter;