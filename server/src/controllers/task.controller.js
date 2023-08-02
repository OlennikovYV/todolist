const sequelize = require("../models");
const Task = sequelize.models.task;
const User = sequelize.models.user;
const Priority = sequelize.models.priority;

exports.taskList = async (req, res) => {
  const id = req.params.id;
  let isSupervisor = true;

  await User.findOne({
    where: {
      id: id,
    },
  }).then((user) => {
    if (!user) {
      return res.status(200).json({
        successTask: false,
        taskList: [],
        messageTask: "Пользователь не найден!",
      });
    }

    user.supervisorid ? (isSupervisor = false) : (isSupervisor = true);
  });

  if (isSupervisor) {
    Task.findAll({
      include: [{ model: Priority, as: "priority" }],
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(200).json({
            successTask: true,
            taskList: [],
            messageTask: "Нет задач для выполнения",
          });
        }

        res.status(200).json({
          successTask: true,
          taskList: task,
          messageTask: "Список задач успешно получен",
        });
      })
      .catch((err) => {
        res.status(500).json({
          successTask: false,
          errorTask: err.message,
          messageTask: "Ошибка получения списка задач",
        });
      });
  } else {
    Task.findAll({
      where: {
        responsibleid: id,
      },
      include: [{ model: Priority, as: "priority" }],
    })
      .then((task) => {
        if (task && !task.length) {
          return res.status(200).json({
            successTask: true,
            taskList: [],
            messageTask: "Нет задач для выполнения",
          });
        }

        res.status(200).json({
          successTask: true,
          taskList: task,
          messageTask: "Список задач успешно получен",
        });
      })
      .catch((err) => {
        res.status(500).json({
          successTask: false,
          errorTask: err.message,
          messageTask: "Ошибка получения списка задач",
        });
      });
  }
};

exports.addTask = async (req, res) => {
  const transaction = req.body.transaction;

  Task.create(transaction)
    .then((record) => {
      return res.status(200).json({
        successTask: true,
        record: record,
        messageTask: "Запись успешно добавлена",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        successTask: false,
        errorTask: err.message,
        messageTask: "Невозможно добавить запись в базу данных",
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
        return res.status(200).json({
          successTask: false,
          messageTask: "Запись не найдена",
        });
      }

      updatedEntry = entry[1][0];

      return res.status(200).json({
        successTask: true,
        record: updatedEntry,
        messageTask: "Запись успешно обновлена",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        successTask: false,
        errorTask: err.message,
        messageTask: "Невозможно обновить запись в базе данных",
      });
    });
};

exports.prioritiesList = async (req, res) => {
  await Priority.findAll()
    .then((list) => {
      if (!list) {
        return res.status(200).json({
          successTask: false,
          prioritiesList: [],
          messageTask: "Справочник приоритетов пуст!",
        });
      }

      res.status(200).json({
        successTask: true,
        prioritiesList: list,
        messageTask: "Справочник приоритетов успешно получен.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        successTask: false,
        errorTask: err.message,
        messageTask: "Ошибка сервера при получении справочника приоритетов",
      });
    });
};
