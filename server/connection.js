const mongoose = require("mongoose");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if (connection.STATES.connected) {
    console.log("Database connected successfully");
  } else {
    console.log("Database connection failed");
  }
};

module.exports = { connectDb };
