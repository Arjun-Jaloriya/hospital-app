const bcrypt = require("bcrypt");
const moment = require("moment");
const { Hospital } = require("../Models/Hospital");
const { User } = require("../Models/User");
const { addHospitalSchema } = require("../Validations/Hospital");
const { Subscription } = require("../Models/Subscription");

const addHospital = async (req, res) => {
  try {
    const { error, value } = addHospitalSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { name, email, password, phone, address, subscriptionId } = value;

    const hashedPassword = await bcrypt.hash(password, 10);
    const subscriptionData = await Subscription.findById(subscriptionId);

    if (!subscriptionData) {
      return res.status(400).send({ error: "Invalid subscription ID" });
    }
    const todayDate = new Date();
    const startDate = new Date(todayDate);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + subscriptionData.month);

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already added");
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).send("Phone No already added");
    }
    const addData = new Hospital({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      startDate: todayDate,
      endDate: endDate,
      subscriptionId: subscriptionId,
    });

    await addData.save();

    const addDataForUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      role: "admin",
      hospitalId: addData._id,
    });

    await addDataForUser.save();
    res.status(201).send({
      success: true,
      msg: "Hospital created successfull",
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

const getHospitals = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page ? req.query.page : "";
    const perpage = req.query.perpage ? req.query.perpage : "";
    const count = await Hospital.countDocuments({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
      ],
    });
    const hospitalData = await Hospital.find({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
      ],
    })
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      msg: "fetched AllHospitals",
      count: count,
      results: hospitalData,
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

const updateHospital = async (req, res) => {
  try {
    const { error, value } = addHospitalSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { name, email, password, phone, address } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentHospital = await Hospital.findById(req.params.id);
    if (!currentHospital) {
      return res.status(404).send({ error: "Hospital not found" });
    }

    if (email !== currentHospital.email) {
      const existingHospitalByEmail = await User.findOne({
        email: email,
        _id: { $ne: req.params.id },
      });
      if (existingHospitalByEmail) {
        return res
          .status(400)
          .send({ error: "Email is already in use by another hospital" });
      }
    }

    if (phone !== currentHospital.phone) {
      const existingHospitalByPhone = await User.findOne({
        phone: phone,
        _id: { $ne: req.params.id },
      });
      if (existingHospitalByPhone) {
        return res.status(400).send({
          error: "Phone number is already in use by another hospital",
        });
      }
    }
    const updateData = {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    };

    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, useFindAndModify: false }
    );

    const updatedUser = await User.findOneAndUpdate(
      { hospitalId: req.params.id },
      updateData,
      { new: true, useFindAndModify: false }
    );

    res.status(200).send({
      success: true,
      msg: "Hospital updated successfully",
      results: updatedHospital,
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

const deleteHospital = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      msg: "Hospital Deleted Successfully",
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
const updateStatusForHospital = async (req, res) => {
  try {
    const todayDate = moment().startOf("day").toDate();
    const hospitals = await Hospital.find({
      enddate: { $lt: todayDate },
      status: { $ne: 0 },
    }).select("_id");

    if (hospitals.length === 0) {
      return;
    }
    const hospitalIds = hospitals.map((hospital) => hospital._id);

    await Hospital.updateMany(
      { _id: { $in: hospitalIds } },
      { $set: { status: 0 } }
    );

    await User.updateMany(
      { hospitalId: { $in: hospitalIds } },
      { $set: { status: 0 } }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addHospital,
  getHospitals,
  updateHospital,
  deleteHospital,
  updateStatusForHospital,
};
