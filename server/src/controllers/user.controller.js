const db = require("../models");
const User = db.user;

exports.getResponsible = async (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: id,
    },
    raw: true,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден!" });
    }

    res.status(200).send({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fathername: user.fathername,
      login: user.login,
      supervisorid: user.supervisorid,
    });
  });
};

exports.getResponsibleList = async (req, res) => {
  const userid = req.params.user;
  const supervisorid = req.params.supervisor;

  if (supervisorid > 0) {
    User.findAll({
      where: {
        supervisorid: supervisorid,
      },
      raw: true,
    }).then((user) => {
      if (!user) {
        return res
          .status(200)
          .send({ list: [], message: "Пользователь не найден!" });
      }

      res.status(200).send({
        user,
      });
    });
  } else {
    let newId;

    await User.findOne({
      where: {
        id: userid,
      },
      raw: true,
    }).then((user) => {
      if (!user) {
        return res.status(200).send({ message: "Пользователь не найден!" });
      }
      newId = user.supervisorid;
    });

    User.findAll({
      where: {
        supervisorid: newId,
      },
      raw: true,
    }).then((user) => {
      if (!user) {
        return res
          .status(200)
          .send({ list: [], message: "Пользователь не найден!" });
      }

      res.status(200).send({
        user,
      });
    });
  }
};
