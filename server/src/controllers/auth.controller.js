const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

exports.signin = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login,
    },
    raw: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: true,
          message: "Пользователь не найден!",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          success: true,
          message: "Неверный пароль!",
        });
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
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err.message,
        message: "Ошибка сервера при входе",
      });
    });
};
