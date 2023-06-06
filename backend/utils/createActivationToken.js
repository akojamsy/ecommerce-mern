const jwt = require("jsonwebtoken");

const createActivationToken = async (user) => {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: "5m",
  });
};

module.exports = { createActivationToken };
