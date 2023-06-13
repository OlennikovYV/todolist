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
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден!" });
    }

    res.status(200).send({
      ...user,
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
  }).then((user) => {
    let supervisorid;

    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден!" });
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
    }).then((user) => {
      if (!user) {
        return res.status(200).send({ list: [], message: "Список пуст!" });
      }

      res.status(200).send([...user]);
    });
  });
};
