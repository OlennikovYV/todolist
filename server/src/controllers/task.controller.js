const moment = require("moment");
const { Op, json } = require("sequelize");
const sequelize = require("../models");
const Task = sequelize.models.task;
const User = sequelize.models.user;
const Priority = sequelize.models.priority;

exports.taskList = async (req, res) => {
  let { displayPeriodName, id, limit, sortOrder, page, sortFieldName } =
    req.query;
  let isSupervisor = true;
  let offset, options;

  page = page || 1;
  limit = limit || 10;
  sortOrder = sortOrder || "ASC";
  sortFieldName = sortFieldName || "id";
  offset = page * limit - limit;

  options = {
    id,
    isSupervisor,
    limit,
    displayPeriodName,
    offset,
    sortOrder,
    sortFieldName,
  };

  try {
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

    const { count, rows } = await getWhereOptions(options);

    if (rows && !rows.length) {
      return res.status(200).json({
        countTask: count,
        messageTask: "Нет задач для выполнения",
        successTask: true,
        taskList: rows,
      });
    }

    res.status(200).json({
      countTask: count,
      messageTask: "Список задач успешно получен",
      successTask: true,
      taskList: rows,
    });
  } catch (err) {
    res.status(500).json({
      successTask: false,
      errorTask: err.message,
      messageTask: "Ошибка получения списка задач",
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

async function getWhereOptions(options) {
  const {
    id,
    isSupervisor,
    limit,
    displayPeriodName,
    offset,
    sortOrder,
    sortFieldName,
  } = options;

  const startPeriod = moment().hour(0).minutes(0).seconds(0).milliseconds(0);
  const periodOneDay = moment(startPeriod).add(1, "days");
  const periodWeek = moment(startPeriod).add(7, "days");
  let rangePeriod, expiriedTask;
  let filtredOptions, filtredResponsible;

  switch (displayPeriodName) {
    case "now":
    case "week":
    case "future":
      expiriedTask = {
        [Op.and]: [
          {
            completion_at: {
              [Op.lt]: startPeriod,
            },
          },
          {
            status: ["к выполнению", "выполняется"],
          },
        ],
      };
      break;
    case "all":
      expiriedTask = null;
      break;
    default:
      throw Error("Неверный период!");
  }

  switch (displayPeriodName) {
    case "now":
      rangePeriod = {
        [Op.and]: [
          {
            completion_at: {
              [Op.gte]: startPeriod,
              [Op.lt]: periodOneDay,
            },
          },
        ],
      };
      break;
    case "week":
      rangePeriod = {
        [Op.and]: [
          {
            completion_at: {
              [Op.gte]: startPeriod,
              [Op.lt]: periodWeek,
            },
          },
        ],
      };
      break;
    case "future":
      rangePeriod = {
        completion_at: {
          [Op.gte]: startPeriod,
        },
      };
      break;
    case "all":
      rangePeriod = null;
      break;
    default:
      throw Error("Неверный период!");
  }

  filtredResponsible = !isSupervisor && { responsibleid: id };

  filtredOptions =
    !rangePeriod && !expiriedTask
      ? {}
      : { [Op.or]: [expiriedTask, rangePeriod] };

  return Task.findAndCountAll({
    include: [{ model: Priority, as: "priority" }],
    where: {
      ...filtredResponsible,
      ...filtredOptions,
    },
    order: [[sortFieldName, sortOrder]],
    limit,
    offset,
  });
}
