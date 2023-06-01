const db = require("../models");
const User = db.user;

checkLogin()= (req, res, next) => {};
checkPassword()= (req, res, next) => {};

const verifySignUp = {
  checkLogin: checkLogin,
  checkPassword: checkPassword
};

module.exports = verifySignUp;
