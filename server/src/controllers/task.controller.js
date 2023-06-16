const db = require("../models");
const Task = db.task;
const User = db.user;

exports.taskList = async (req, res) => {
  const id = req.params.id;
  let isSupervisor = true;

  await User.findOne({
    where: {
      id: id,
    },
    raw: true,
  }).then((user) => {
    if (!user) {
      return res.status(200).send({
        success: false,
        listTask: [],
        message: "Пользователь не найден!",
      });
    }

    user.supervisorid ? (isSupervisor = false) : (isSupervisor = true);
  });

  if (isSupervisor) {
    Task.findAll({
      raw: true,
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(200).send({
            success: true,
            listTask: [],
            message: "Нет задач для выполнения",
          });
        }

        res.status(200).send({
          success: true,
          listTask: task,
          message: "Список задач успешно получен",
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          error: err.message,
          message: "Ошибка получения списка задач",
        });
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
          return res.status(200).send({
            success: true,
            listTask: [],
            message: "Нет задач для выполнения",
          });
        }

        res.status(200).send({
          success: true,
          listTask: task,
          message: "Список задач успешно получен",
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          error: err.message,
          message: "Ошибка получения списка задач",
        });
      });
  }
};

exports.addTask = async (req, res) => {
  const trasaction = req.params.trasaction;

  Task.create(trasaction)
    .then((record) => {
      return res.status(200).send({
        success: true,
        record: record,
        message: "Запись успешно добавлена",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: err.message,
        message: "Невозможно добавить запись в базу данных",
      });
    });
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const trasaction = req.params.trasaction;

  Task.update(trasaction, {
    where: {
      id: id,
    },
  })
    .then((record) => {
      return res.status(200).send({
        success: true,
        record: record,
        message: "Запись успешно обновлена",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: err.message,
        message: "Невозможно обновить запись в базе данных",
      });
    });
};
