const sequelize = require("../models");
const bcrypt = require("bcryptjs");
const User = sequelize.models.user;

exports.signin = (req, res) => {
  const { login, password } = req.body;

  User.findOne({
    where: {
      login: login,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: true,
          message: "Пользователь не найден!",
        });
      }

      var passwordIsValid = bcrypt.compareSync(password, user.password);

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
