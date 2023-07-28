const bcrypt = require("bcryptjs");

const sequelize = require("../models");
const ApiError = require("../error/api.error");

const User = sequelize.models.user;

exports.signin = (req, res, next) => {
  const { login, password } = req.body;

  User.findOne({
    where: {
      login: login,
    },
  })
    .then((user) => {
      if (!user) {
        return next(ApiError.Unauthorized("Пользователь не найден!"));
      }

      var passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return next(ApiError.Unauthorized("Неверный пароль!"));
      }

      res.status(200).send({
        success: true,
        authenticatedUser: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          fathername: user.fathername,
          login: user.login,
          supervisorid: user.supervisorid,
        },
        message: "Аутентификация успешна!",
      });
    })
    .catch((error) => {
      return next(ApiError.Unauthorized(error.message));
    });
};
