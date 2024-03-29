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

      if (!bcrypt.compareSync(password, user.password)) {
        return next(ApiError.Unauthorized("Неверный пароль!"));
      }

      res.status(200).json({
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
      return next(ApiError.Internal(error.message));
    });
};
