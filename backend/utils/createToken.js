// create jwt token and save as cookies in browser
const sendToken = async (user, statusCode, res) => {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
