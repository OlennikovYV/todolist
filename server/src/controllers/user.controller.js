const db = require("../models");
const User = db.user;

exports.getResponsible = async (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["password"],
    },
    raw: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: true,
          message: "Пользователь не найден!",
        });
      }

      // TODO! Переделать в объект {success, users, message}
      res.status(200).send({
        ...user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        error: err.message,
        message: "Ошибка сервера при получении ответственного",
      });
    });
};

exports.getResponsibleList = async (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: id,
    },
    raw: true,
  })
    .then((user) => {
      let supervisorid;

      if (!user) {
        return res.status(404).send({
          success: true,
          message: "Пользователь не найден!",
        });
      }

      supervisorid = user.supervisorid ? user.supervisorid : user.id;

      User.findAll({
        where: {
          supervisorid: supervisorid,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      })
        .then((user) => {
          if (!user) {
            return res.status(200).send({
              success: true,
              list: [],
              message: "Список пуст!",
            });
          }

          res.status(200).send([...user]);
        })
        .catch((err) => {
          res.status(500).send({
            success: true,
            error: err.message,
            message: "Ошибка сервера при получении списка ответственных",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        error: err.message,
        message: "Ошибка сервера при получении ответственного",
      });
    });
};
