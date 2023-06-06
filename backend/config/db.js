const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    // console.log(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error - ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnection;
