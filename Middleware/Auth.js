const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");

const issignin = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (token) {
      const verifyuser = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifyuser) {
        return res.send("you have not valid token");
      }
      req.user = await User.findOne({ _id: verifyuser._id });
      next();
    } else {
      return res.status(404).send({
        success: false,
        msg: "please login",
      });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        success: false,
        msg: "Token has expired",
      });
    }
    console.error(error);
    return res.status(500).send({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};

// const issuperadmin = async (req, res, next) => {
//   try {
//     const userdata = await User.findById(req.user._id);

//     if (userdata.role !== 0) {
//       return res.status(404).send({
//         success: false,
//         msg: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       msg: "Error in superadmin middelware",
//     });
//   }
// };

// const isadmin = async (req, res, next) => {
//   try {
//     const vdata = await User.findOne({ _id: req.user._id });

//     if (vdata.role !== 1) {
//       return res.status(404).send({
//         success: false,
//         msg: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       msg: "Error in admin middelware",
//     });
//   }
// };

module.exports = { issignin };
