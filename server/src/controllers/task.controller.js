const db = require("../models");
const Task = db.task;
const User = db.user;

exports.allTaskList = async (req, res) => {
  const id = req.params.id;
  let isSupervisor = true;

  await User.findOne({
    where: {
      id: id,
    },
    raw: true,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден!" });
    }

    user.supervisorid ? (isSupervisor = false) : (isSupervisor = true);
  });

  if (isSupervisor) {
    Task.findAll({
      raw: true,
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(404).send({ message: "Задач нет!" });
        }

        res.status(200).send({ listTask: task });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    Task.findAll({
      where: {
        responsibleid: id,
      },
      raw: true,
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(404).send({ message: "Задач нет!" });
        }

        res.status(200).send({ listTask: task });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};
