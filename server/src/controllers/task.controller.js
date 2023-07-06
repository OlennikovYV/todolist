const db = require("../models");
const Task = db.task;
const User = db.user;
const Priorities = db.priorities;

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
        taskList: [],
        message: "Пользователь не найден!",
      });
    }

    user.supervisorid ? (isSupervisor = false) : (isSupervisor = true);
  });

  if (isSupervisor) {
    Task.findAll({
      include: [
        {
          model: Priorities,
          as: "priority",
        },
      ],
      raw: true,
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(200).send({
            success: true,
            taskList: [],
            message: "Нет задач для выполнения",
          });
        }

        res.status(200).send({
          success: true,
          taskList: task,
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
      include: [
        {
          model: Priorities,
          as: "priority",
        },
      ],
      raw: true,
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(200).send({
            success: true,
            taskList: [],
            message: "Нет задач для выполнения",
          });
        }

        res.status(200).send({
          success: true,
          taskList: task,
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
  const transaction = req.body.transaction;

  Task.create(transaction)
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
  const transaction = req.body.transaction;

  Task.update(transaction, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then((entry) => {
      const countUpdateRecord = entry[0];
      let updatedEntry;

      if (!countUpdateRecord) {
        return res.status(200).send({
          success: false,
          message: "Запись не найдена",
        });
      }

      updatedEntry = entry[1][0];

      return res.status(200).send({
        success: true,
        record: updatedEntry,
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

exports.prioritiesList = async (req, res) => {
  await Priorities.findAll({
    raw: true,
  })
    .then((list) => {
      if (!list) {
        return res.status(200).send({
          success: false,
          prioritiesList: [],
          message: "Справочник приоритетов пуст!",
        });
      }

      res.status(200).send({
        success: true,
        prioritiesList: list,
        message: "Справочник приоритетов успешно получен.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err.message,
        message: "Ошибка сервера при получении справочника приоритетов",
      });
    });
};
