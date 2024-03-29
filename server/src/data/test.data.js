const bcrypt = require("bcryptjs");
const moment = require("moment");

const currentDate = moment().format();
const addDaysToСurrentDate = (day) =>
  moment(currentDate).add(day, "days").format();
const substractDaysFromСurrentDate = (day) =>
  moment().subtract(day, "days").format();

const priorityList = [
  {
    caption: "низкий",
    description: "низкий",
    create_at: currentDate,
    update_at: currentDate,
    period: 1,
  },
  {
    caption: "средний",
    description: "средний",
    create_at: currentDate,
    update_at: currentDate,
    period: 6,
  },
  {
    caption: "высокий",
    description: "высокий",
    create_at: currentDate,
    update_at: currentDate,
    period: 15,
  },
];

const salt = bcrypt.genSaltSync(8);
const userList = [
  {
    firstname: "Юрий",
    lastname: "Оленников",
    fathername: "Викторович",
    login: "OlennikovYV",
    password: bcrypt.hashSync("pass1", salt),
    supervisorid: null,
  },
  {
    firstname: "Сергей",
    lastname: "Соколов",
    fathername: "Петрович",
    login: "SokolovSP",
    password: bcrypt.hashSync("pass2", salt),
    supervisorid: null,
  },
  {
    firstname: "Иван",
    lastname: "Иванов",
    fathername: "Иванович",
    login: "IvanovII",
    password: bcrypt.hashSync("pass3", salt),
    supervisorid: 1,
  },
  {
    firstname: "Дмитрий",
    lastname: "Николаев",
    fathername: "Юрьевич",
    login: "NikolaevDY",
    password: bcrypt.hashSync("pass4", salt),
    supervisorid: 1,
  },
  {
    firstname: "Павел",
    lastname: "Ефимов",
    fathername: "Павлович",
    login: "EfimofPP",
    password: bcrypt.hashSync("pass5", salt),
    supervisorid: 2,
  },
  {
    firstname: "Иван",
    lastname: "Петров",
    fathername: "Иванович",
    login: "PetrovII",
    password: bcrypt.hashSync("pass6", salt),
    supervisorid: 2,
  },
];

const taskList = [
  {
    caption: "Задача 1",
    description: "Описание 1",
    completion_at: substractDaysFromСurrentDate(1),
    create_at: substractDaysFromСurrentDate(16),
    update_at: substractDaysFromСurrentDate(1),
    priorityId: 3,
    status: "отменена",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 2",
    description: "Описание 2",
    completion_at: addDaysToСurrentDate(6),
    create_at: currentDate,
    update_at: currentDate,
    priorityId: 2,
    status: "к выполнению",
    creatorid: 1,
    responsibleid: 4,
  },
  {
    caption: "Задача 3",
    description: "Описание 3",
    completion_at: substractDaysFromСurrentDate(2),
    create_at: substractDaysFromСurrentDate(10),
    update_at: currentDate,
    priorityId: 1,
    status: "выполняется",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 4",
    description: "Описание 4",
    completion_at: addDaysToСurrentDate(1),
    create_at: currentDate,
    update_at: currentDate,
    priorityId: 1,
    status: "отменена",
    creatorid: 2,
    responsibleid: 6,
  },
  {
    caption: "Задача 5",
    description: "Описание 5",
    completion_at: substractDaysFromСurrentDate(1),
    create_at: substractDaysFromСurrentDate(16),
    update_at: substractDaysFromСurrentDate(1),
    priorityId: 3,
    status: "выполняется",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 6",
    description: "Описание 6",
    completion_at: addDaysToСurrentDate(8),
    create_at: substractDaysFromСurrentDate(7),
    update_at: currentDate,
    priorityId: 3,
    status: "выполняется",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 7",
    description: "Описание 7",
    completion_at: addDaysToСurrentDate(15),
    create_at: currentDate,
    update_at: currentDate,
    priorityId: 3,
    status: "к выполнению",
    creatorid: 1,
    responsibleid: 4,
  },
  {
    caption: "Задача 8",
    description: "Описание 8",
    completion_at: addDaysToСurrentDate(10),
    create_at: substractDaysFromСurrentDate(5),
    update_at: substractDaysFromСurrentDate(5),
    priorityId: 3,
    status: "отменена",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 9",
    description: "Описание 9",
    completion_at: currentDate,
    create_at: substractDaysFromСurrentDate(6),
    update_at: currentDate,
    priorityId: 2,
    status: "выполнена",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 10",
    description: "Описание 10",
    completion_at: addDaysToСurrentDate(5),
    create_at: substractDaysFromСurrentDate(10),
    update_at: substractDaysFromСurrentDate(4),
    priorityId: 2,
    status: "выполняется",
    creatorid: 1,
    responsibleid: 3,
  },
];

module.exports = {
  userList: userList,
  taskList: taskList,
  priorityList: priorityList,
};
