const { Patient } = require("../Models/Patient");
const { patientSchema } = require("../Validations/Patient");

const getPatients = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page ? req.query.page : 1;
    const perpage = req.query.perpage ? req.query.perpage : 5;
    const id = req.user.hospitalId;
    const count = await Patient.countDocuments({
      hospitalId: id,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { PNO: { $regex: search, $options: "i" } },
      ],
    });

    const getData = await Patient.find({
      hospitalId: id,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { PNO: { $regex: search, $options: "i" } },
      ],
    })
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      msg: "getAllPatients",
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
    const { error, value } = patientSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    const generatePNONumber = async () => {
      const lastPNO = await Patient.findOne().sort({ createdAt: -1 });
      let nextPNONumber;
      if (lastPNO && lastPNO.PNO) {
        const lastPNONumber = parseInt(lastPNO.PNO.replace("P", ""), 10);
        const nextPNONumberInt = lastPNONumber + 1;
        nextPNONumber = "P" + nextPNONumberInt.toString().padStart(2, "0");
      } else {
        nextPNONumber = "P01";
      }
      return nextPNONumber;
    };
    const PNONumber = await generatePNONumber();
    const addData = new Patient({
      ...value,
      PNO: PNONumber,
      hospitalId: req.user.hospitalId,
    });
    await addData.save();
    res.status(200).send({
      success: true,
      msg: "Patient Added Successfull",
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
    const { error, value } = patientSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    const { name, address, phone, healthDetails, healthIssues } = value;

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
