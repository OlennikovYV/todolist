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
        return res.status(401).send({ message: "Пользователь не найден!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Неверный пароль!" });
      }

      res.status(200).send({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        fathername: user.fathername,
        login: user.login,
        supervisorid: user.supervisorid,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
