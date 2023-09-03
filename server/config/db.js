const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log("mongo connect");
  } catch (error) {
    console.log("error");
  }
};

module.exports = connectDB;
