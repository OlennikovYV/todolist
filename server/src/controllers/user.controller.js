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
