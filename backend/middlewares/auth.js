const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const authenticated = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.auth;

  console.log(token);

  if (!token) {
    res.status(401).json({ message: "Login to continue this action." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(400);
    throw new Error("Invalid token");
  }
});

module.exports = { authenticated };
