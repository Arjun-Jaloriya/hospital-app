const bcrypt = require("bcrypt");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { registerSchema, loginSchema } = require("../Validations/Auth");

const Register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { name, email, password, phone, address, hospitalName } = value;

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
      hospitalName: hospitalName,
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
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "email is not registred",
      });
    }

    const matchpass = await bcrypt.compare(password, user.password);

    if (!matchpass) {
      return res.status(404).send({
        success: false,
        msg: "invalid email or password",
      });
    }
    if (!user.status == 1) {
      return res.status(404).send({
        success: false,
        msg: "sorry you cannot login",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.token = await User.findByIdAndUpdate(
      user._id,
      { token: token },
      { new: true }
    );

    res.status(200).send({
      success: true,
      msg: `${user.name}-you are successfully login`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        hospitalName: user.hospitalName,
      },
      token,
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
      user: req.user,
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
