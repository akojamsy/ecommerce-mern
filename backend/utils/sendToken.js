const Token = require("../models/Token");
const sendMail = require("./sendMail");
const crypto = require("crypto");

const sendActivationToken = async (user, res) => {
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  console.log(token);
  // const activationToken = await createActivationToken(user);
  const activationLink = `${process.env.BASE_URL}/activation/${user.id}/verify/${token.token}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Activate your account`,
      message: `Hello ${user.fullname}, \n\n Please click the link below to activate your account \n\n ${activationLink}`,
    });
    res.status(201).json({
      success: true,
      message: `Please check your email:- ${user.email} and activate your account.`,
    });
  } catch (error) {
    res.status(500);
    throw new Error({ message: error.message });
  }
};

module.exports = sendActivationToken;
