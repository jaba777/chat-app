const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoute.js");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");

const app = express();

dotenv.config();

app.use(parser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

connectDB();

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is running", PORT);
});
