const { Appointment } = require("../Models/Appoinment");
const { Patient } = require("../Models/Patient");
const { User } = require("../Models/User");
const { appointmentSchema } = require("../Validations/Appointment");
const moment = require("moment");

const createAppointment = async (req, res) => {
  try {
    const { error, value } = appointmentSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { caseType, fees, patientId, date } = value;

    const addApointment = new Appointment({
      patientId: patientId,
      hospitalId: req.user.hospitalId,
      caseType: caseType,
      fees: fees,
      date: date,
    });
    await addApointment.save();
    res.status(201).send({
      success: true,
      msg: "Appointment Created",
    });
    await addApointment.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "something went wrong",
      error,
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page ? req.query.page : 1;
    const perpage = req.query.perpage ? req.query.perpage : 5;
    const date = req.query.date ? req.query.date : "";
    const id = req.user.hospitalId;
    const startDate = date? moment(date, "YYYY-MM-DD").startOf("day").toDate(): null;
    const endDate = date? moment(date, "YYYY-MM-DD").endOf("day").toDate(): null;

    let patientIds = [];
    const appointments = await Appointment.find({
      hospitalId: id,
      date: { $gte: startDate, $lte: endDate },
    }).select("patientId");

    patientIds = appointments.map((appointment) => appointment.patientId);

    let matchCriteria = {
      hospitalId: id,
      ...(patientIds.length > 0 && { _id: { $in: patientIds } }),
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { PNO: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const count = await Patient.countDocuments(matchCriteria);
    const getData = await Patient.find(matchCriteria)
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ date: -1 });

    res.status(200).send({
      success: true,
      msg: "Fetched All Appointments",
      count: count,
      results: getData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "something went wrong",
      error,
    });
  }
};
module.exports = { createAppointment, getAppointments };
