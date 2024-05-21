const bcrypt = require("bcrypt");
const moment = require("moment");
const { Hospital } = require("../Models/Hospital");
const { User } = require("../Models/User");
const { addHospitalSchema } = require("../Validations/Hospital");

const addHospital = async (req, res) => {
  try {
    const { error, value } = addHospitalSchema.validate(req.body);
    if (error) return res.send({ error: error.message });
    const { name, email, password, phone, address } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const todayDate = new Date();
    const startDate = new Date(todayDate);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 12);
    
    const existingData = await User.findOne({email});
    if(existingData){
        return res.status(400).send("already added");
    }
    const addData = new Hospital({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      startdate: todayDate,
      enddate: endDate,
    });
    await addData.save();

    const addDataForUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      role: addData.role,
      startdate: addData.startdate,
      enddate: addData.enddate,
      hospitalId: addData._id,
    });
    await addDataForUser.save();
    res.status(201).send({
      success: true,
      msg: `${name}-Hospital created successfully`,
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

module.exports = { addHospital };
