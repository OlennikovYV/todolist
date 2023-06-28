const { Op } = require("sequelize");

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

      res.status(200).send({
        success: true,
        user: user,
        message: `Ответственный ${user.login}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err.message,
        message: "Ошибка сервера при получении ответственного",
      });
    });
};

exports.getResponsibleList = async (_, res) => {
  User.findAll({
    where: {
      supervisorid: {
        [Op.ne]: null,
      },
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

      res.status(200).send({
        success: true,
        list: [...user],
        message: `Ответственный ${user.login}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err.message,
        message: "Ошибка сервера при получении списка ответственных",
      });
    });
};
