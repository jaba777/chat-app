const userModule = require("../models/userModule.js");
const { hashedPassword, comparePassword } = require("../helpers/authHelper.js");

const registerController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
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
    }).save();
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

module.exports = { registerController };
