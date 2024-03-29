const { Op } = require("sequelize");

const sequelize = require("../models");
const User = sequelize.models.user;

exports.getResponsible = async (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["password"],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          successUser: true,
          responsible: null,
          messageUser: "Пользователь не найден!",
        });
      }

      res.status(200).json({
        successUser: true,
        responsible: user,
        messageUser: `Ответственный ${user.login}.`,
      });
    })
    .catch((err) => {
      res.status(500).json({
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
  })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          messageUser: "Список пуст!",
          responsibleList: [],
          successUser: true,
        });
      }

      res.status(200).json({
        messageUser: `Ответственный ${user.login}.`,
        responsibleList: [...user],
        successUser: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorUser: err.message,
        messageUser: "Ошибка сервера при получении списка ответственных",
        successUser: false,
      });
    });
};
