const userModule = require("../models/userModule.js");
const { hashedPassword, comparePassword } = require("../helpers/authHelper.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const avatarImage = req.file;

    if (avatarImage && avatarImage.size > 1000000){
      throw { statusCode: 400, message: "big size of photo" };
    }
    if (!email || !username || !password) {
      throw { statusCode: 400, message: "fill every input" };
    }
    if (password.length < 8) {
      throw {
        statusCode: 402,
        message: "Password should be equal or greater than 8 characters.",
      };
    }
    if (username.length < 3) {
      throw {
        statusCode: 402,
        message: "Username should be greater than 3 characters.",
      };
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw {
        statusCode: 402,
        message: "Email is required.",
      };
    }

    const findUser = await userModule.findOne({ email });
    if (findUser) {
      throw {
        statusCode: 402,
        message: "Already register please login.",
      };
    }

    const hashPassword = await hashedPassword(password);

    const user = await new userModule({
      email,
      username,
      password: hashPassword,
    });

    //console.log("file", avatarImage.type);

    if (avatarImage) {
      const { originalname, mimetype, size, filename, path } = avatarImage;

      user.avatarImage.data = fs.readFileSync(path);
      user.avatarImage.contentType = mimetype;
    }

    await user.save();

    return res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModule.findOne({ email });
    if (!findUser) {
      throw {
        statusCode: 402,
        message: "This email isn't register.",
      };
    }
    const comparePass = await comparePassword(password, findUser.password);
    if (!comparePass) {
      throw {
        statusCode: 402,
        message: "password isn't correct.",
      };
    }
    const token = jwt.sign(
      { id: findUser._id, username: findUser.username, email: findUser.email },
      jwtSecret,
      {
        expiresIn: "2d",
      }
    );

    return res
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(200)
      .send({
        success: true,
        user: {
          id: findUser._id,
          username: findUser.username,
          email: findUser.email,
        },
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

const myProfile = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (token) {
      const verify = jwt.verify(token, jwtSecret);
      if (!verify) {
        throw {
          statusCode: 402,
          message: "token isn't correct.",
        };
      }

      return res.send({ user: verify });
    }
  } catch (error) {}
};

module.exports = { registerController, signInController, myProfile };
