const bcrypt = require("bcrypt");

const hashedPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const comparePass = await bcrypt.compare(password, hashedPassword);
    return comparePass;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashedPassword, comparePassword };
