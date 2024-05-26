const bcrypt = require("bcrypt");
const moment = require("moment");
const { Reception } = require("../Models/Reception");
const { addReceptionSchema } = require("../Validations/Reception");
const { User } = require("../Models/User");

const addReception = async (req, res) => {
  try {
    const { error, value } = addReceptionSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { name, email, password, phone, address } = value;
    const hashedPassword = await bcrypt.hash(password, 10);

    const hospitalData = await User.findOne(req.user);

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already added");
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).send("Phone No already added");
    }
    const addDataForReception = new Reception({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      hospitalId: hospitalData.hospitalId,
    });
    await addDataForReception.save();

    const addData = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      role:"reception",
      hospitalId: hospitalData.hospitalId,
      receptionId: addDataForReception._id,
    });
    await addData.save();
    res.status(201).send({
      success: true,
      msg: "Reception Created Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const getReceptions = async (req, res) => {
  try {
    const getReceptionsData = await Reception.find({
      hospitalId: req.user.hospitalId,
    });
    res.status(200).send({
      success: true,
      msg: "Reception fetched",
      count: getReceptionsData.length,
      results: getReceptionsData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};
const deleteReception = async (req, res) => {
  await Reception.findByIdAndDelete(req.params.id);
  await User.findOneAndDelete({
    receptionId: req.params.id,
  });
  res.status(200).send({
    success: true,
    msg: "Reception deleted",
  });
};
module.exports = { addReception, getReceptions, deleteReception };
