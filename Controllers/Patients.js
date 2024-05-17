const { Patient } = require("../Models/Patient");

const getPatients = async (req, res) => {
  try {
    const getData = await Patient.find({});
    res.status(200).send({
      success: true,
      msg: "getAllPatients",
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
const getPatient = async (req, res) => {
  try {
    const getData = await Patient.findById(req.params.id);
    res.status(200).send({
      success: true,
      msg: "get-Patient",
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
const addPatient = async (req, res) => {
  try {
    const { name, phone, address, healthDetails, healthIssues } = req.body;
    if (!name || !phone || !address || healthIssues || healthDetails) {
      return res.send("all fields are reqired");
    }
    const addData = new Patient({
      ...req.body,
    });
    await addData.save();
    res.status(200).send({
      success: true,
      msg: "added successfully",
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

const updatePatient = async (req, res) => {
  try {
    const { name, phone, address, healthDetails, healthIssues } = req.body;
    if (!name || !phone || !address || healthIssues || healthDetails) {
      return res.send("all fields are reqired");
    }
    const updateData = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        $push: { healthDetails: healthDetails, healthIssues: healthIssues },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send({
      success: true,
      msg: "update successfully",
      results: updateData,
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
const deletePatient = async (req, res) => {
  try {
    const deleteData = await Patient.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      msg: "deleted successfully",
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
module.exports = {
  getPatients,
  getPatient,
  addPatient,
  updatePatient,
  deletePatient,
};
