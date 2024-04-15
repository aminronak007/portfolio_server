const bcrypt = require("bcrypt");
const saltRounds = 10;

async function encryptPassword(req_password) {
  try {
    const hash = await bcrypt.genSalt(saltRounds);
    const encryptPassword = await bcrypt.hash(req_password, hash);
    return encryptPassword;
  } catch (error) {
    console.log(error);
  }
}

async function checkPassword(req_password, db_password) {
  const isValidPassword = await bcrypt.compare(req_password, db_password);
  return isValidPassword;
}

module.exports = {
  encryptPassword,
  checkPassword,
};
