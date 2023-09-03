const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const app = express();

dotenv.config();

app.use(parser.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is running");
});
