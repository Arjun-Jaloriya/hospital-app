const bcrypt = require("bcrypt");
const moment = require("moment");
const { addPharmacySchema } = require("../Validations/Pharmacy");
const { Pharmacy } = require("../Models/Pharmacy");
const { User } = require("../Models/User");

const addPharmacy = async (req, res) => {
  try {
    const { error, value } = addPharmacySchema.validate(req.body);
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
    const addDataForPharmacy = new Pharmacy({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      hospitalId: hospitalData.hospitalId,
    });
    await addDataForPharmacy.save();

    const addData = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      role: "pharmacy",
      hospitalId: hospitalData.hospitalId,
      pharmacyId: addDataForPharmacy._id,
    });
    await addData.save();
    res.status(201).send({
      success: true,
      msg: "Pharmacy created successfull",
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

const getPharmacies = async (req, res) => {
  try {
    const getPharmaciesData = await Pharmacy.find({
      hospitalId: req.user.hospitalId,
    });
    res.status(200).send({
      success: true,
      msg: "Reception fetched",
      count: getPharmaciesData.length,
      results: getPharmaciesData,
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
const deletePharmacy = async (req, res) => {
  try {
    await Pharmacy.findByIdAndDelete(req.params.id);
    await User.findOneAndDelete({ pharmacyId: req.params.id });
    res.status(200).send({
      success: true,
      msg: "Pharmacy deleted",
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
module.exports = { addPharmacy, getPharmacies, deletePharmacy };
