const bcrypt = require("bcrypt");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { registerSchema, loginSchema } = require("../Validations/Auth");
const { Hospital } = require("../Models/Hospital");
const moment = require("moment");

const Register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { name, email, password, phone, address } = value;

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).send({
        success: true,
        msg: "User Allready Register please login",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name: name,
      email: email,
      password: hashPassword,
      address: address,
      phone: phone,
    });
    await userData.save();
    res.status(200).send({
      success: true,
      msg: "User Register Successfully",
      results: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in register",
      error,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.message });

    const { email, password } = value;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "Email is not registered",
      });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(404).send({
        success: false,
        msg: "Invalid email or password",
      });
    }

    if (user.status !== 1) {
      return res.status(403).send({
        success: false,
        msg: "Sorry, you cannot login",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(user._id, { token });

    user = await User.findById(user._id);

    if (user.role !== "superAdmin") {
      const hospitalData = await Hospital.findById(user.hospitalId);
      const endDate = moment(hospitalData.endDate).endOf("day").toDate();
      const todayDate = moment().startOf("day").toDate();
      if (todayDate > endDate) {
        return res.status(401).send({
          success: false,
          msg: "Your subscription has expired",
        });
      }
      res.status(200).send({
        success: true,
        msg: "Login successful",
        results: {
          hospitalName: hospitalData.name,
          user,
        },
      });
    } else {
      res.status(200).send({
        success: true,
        msg: "Login successful",
        results: user,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Error in login",
      error,
    });
  }
};

module.exports = { Login };

const profileToken = async (req, res) => {
  try {
    const token = req.headers.authorization; // Extract token from Authorization header
    if (!token) {
      return res.status(401).send({
        success: false,
        msg: "No token provided",
      });
    }
    res.status(200).send({
      success: true,
      msg: "You have a valid token",
      results: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "error in login",
      error,
    });
  }
};
module.exports = { Register, Login, profileToken };
