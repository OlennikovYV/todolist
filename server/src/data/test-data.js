const bcrypt = require("bcryptjs");

const userList = [
  {
    firstname: "Юрий",
    lastname: "Оленников",
    fathername: "Викторович",
    login: "OlennikovYV",
    password: bcrypt.hashSync("pass1", bcrypt.genSaltSync(8)),
    supervisorid: null,
  },
  {
    firstname: "Сергей",
    lastname: "Соколов",
    fathername: "Петрович",
    login: "SokolovSP",
    password: bcrypt.hashSync("pass2", 8),
    supervisorid: null,
  },
  {
    firstname: "Иван",
    lastname: "Иванов",
    fathername: "Иванович",
    login: "IvanovII",
    password: bcrypt.hashSync("pass3", 8),
    supervisorid: 1,
  },
  {
    firstname: "Дмитрий",
    lastname: "Николаев",
    fathername: "Юрьевич",
    login: "NikolaevDY",
    password: bcrypt.hashSync("pass4", 8),
    supervisorid: 1,
  },
  {
    firstname: "Павел",
    lastname: "Ефимов",
    fathername: "Павлович",
    login: "EfimofPP",
    password: bcrypt.hashSync("pass5", 8),
    supervisorid: 2,
  },
];

const taskList = [
  {
    caption: "Задача 1",
    description: "Описание 1",
    completion_at: "2023-06-06 16:01:12.347+05",
    create_at: Date.now(),
    update_at: Date.now(),
    priority: "высокий",
    status: "к выполнению",
    creatorid: 1,
    responsibleid: 3,
  },
  {
    caption: "Задача 2",
    description: "Описание 2",
    completion_at: "2023-06-15 12:12:33.002+05",
    create_at: Date.now(),
    update_at: Date.now(),
    priority: "средний",
    status: "к выполнению",
    creatorid: 1,
    responsibleid: 4,
  },
  {
    caption: "Задача 3",
    description: "Описание 3",
    completion_at: "2023-05-02 15:31:42.907+05",
    create_at: Date.now(),
    update_at: Date.now(),
    priority: "низкий",
    status: "выполняется",
    creatorid: 1,
    responsibleid: 3,
  },
];

module.exports = {
  userList: userList,
  taskList: taskList,
};
