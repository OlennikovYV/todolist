const db = require("../models");
const Task = db.task;

exports.allTaskList = (req, res) => {
  Task.findAll({ raw: true })
    .then((task) => {
      if (task && !task.length) {
        return res.status(404).send({ message: "Задач нет!" });
      }

      res.status(200).send({ date: task });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
