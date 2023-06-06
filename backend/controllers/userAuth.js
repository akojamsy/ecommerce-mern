const User = require("../models/User");
const path = require("path");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const crypto = require("crypto");
const { createActivationToken } = require("../utils/createActivationToken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/createToken");
const Token = require("../models/Token");
const sendActivationToken = require("../utils/sendToken");

const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    let filename = req.file.filename;
    let filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Unable to delete file." });
      }
    });
    res.status(200).json({ message: "User already exist" });
  }

  try {
    // const user = await User.create({ email, password, fullname });
    const filename = req.file?.filename;
    const fileUrl = filename ? path.join(filename) : "";

    const user = await new User({
      fullname,
      email,
      password,
      avatar: fileUrl,
    }).save();

    await sendActivationToken(user, res);
  } catch (error) {
    res.status(400);
    res.json({ message: `${error.message}` });
    throw new Error({ message: error.message });
  }
});

// const verifyActivation = asyncHandler(async (req, res, next) => {
//   try {
//     const { activation_token } = req.body;
//     const newUser = jwt.verify(activation_token, process.env.SECRET);
//     if (!newUser) {
//       throw new Error({ message: "Invalid activation token" });
//     }
//     const { email, password, avatar, fullname } = newUser;
//     const user = await User.create({ email, password, avatar, fullname });

//     sendToken(newUser, 201, res);
//   } catch (error) {
//     throw new Error({ message: error.message });
//   }
// });
const verifyActivation = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const activationToken = req.params.token;
    // find user in db
    const user = await User.findOne({ _id: userId });

    if (!user) return res.status(400).json({ message: "Invalid link" });
    // find user token in token's table in the database
    const token = await Token.findOne({
      userId: user._id,
      token: activationToken,
    });

    if (!token) return res.status(400).json({ message: "Invalid link" });

    await User.updateOne(
      {
        _id: user._id,
      },
      {
        verified: true,
      }
    );

    await Token.deleteOne({
      userId: user._id,
      token: activationToken,
    });

    res
      .status(200)
      .json({ success: true, message: "Email verification successful" });
    // const newUser = jwt.verify(activation_token, process.env.SECRET);
    // if (!newUser) {
    //   throw new Error({ message: "Invalid activation token" });
    // }
    // const { email, password, avatar, fullname } = newUser;
    // const user = await User.create({ email, password, avatar, fullname });
    // sendToken(newUserDetails, 201, res);
  } catch (error) {
    throw new Error({ message: error });
  }
});

const resendToken = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ _id: req.body.id });
  const token = await Token.findOne({ userId: req.body.id });

  if (token) token.remove();
  console.log(user, token);
  // if (user) {
  //   await sendActivationToken(user);
  // }
});

module.exports = {
  register,
  verifyActivation,
  resendToken,
};