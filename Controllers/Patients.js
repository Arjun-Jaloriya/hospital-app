const { Patient } = require("../Models/Patient");
const { patientSchema } = require("../Validations/Patient");

const getPatients = async (req, res) => {
  try {
    const getData = await Patient.find({});
    res.status(200).send({
      success: true,
      msg: "getAllPatients",
      count: getData.length,
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
    // const { name, phone, address, healthDetails, healthIssues } = req.body;
    const { error } = patientSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
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
    const { error } = patientSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    const { name, address, phone, healthDetails, healthIssues } = req.body;

    const updateData = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          healthDetails: healthDetails,
          healthIssues: healthIssues,
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send({
      success: true,
      msg: "Updated successfully",
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
    await Patient.findByIdAndDelete(req.params.id);
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
