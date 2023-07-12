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
          successUser: true,
          responsible: null,
          messageUser: "Пользователь не найден!",
        });
      }

      res.status(200).send({
        successUser: true,
        responsible: user,
        messageUser: `Ответственный ${user.login}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        successUser: false,
        error: err.message,
        messageUser: "Ошибка сервера при получении ответственного",
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
          messageUser: "Список пуст!",
          responsibleList: [],
          successUser: true,
        });
      }

      res.status(200).send({
        messageUser: `Ответственный ${user.login}.`,
        responsibleList: [...user],
        successUser: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        errorUser: err.message,
        messageUser: "Ошибка сервера при получении списка ответственных",
        successUser: false,
      });
    });
};
