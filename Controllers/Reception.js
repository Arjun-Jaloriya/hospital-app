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
    const todayDate = new Date();
    const startDate = new Date(todayDate);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 12);

    const hospitalData =await User.findOne(req.user);
    
    const existingData = await User.findOne({email});
    if(existingData){
        return res.status(400).send("already added");
    }
    const addDataForReception = new Reception({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      startdate: todayDate,
      enddate: endDate,
      hospitalId: hospitalData.hospitalId,
    });
    await addDataForReception.save();

    const addData = new User({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      startdate: todayDate,
      enddate: endDate,
      role:addDataForReception.role,
      hospitalId:addDataForReception.hospitalId,
      receptionId:addDataForReception._id
    });
    await addData.save();
    res.status(201).send({
        success:true,
        msg:`${name}-Reception created successfully`,

    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

module.exports = { addReception };
