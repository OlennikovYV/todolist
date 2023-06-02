const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const User = db.user;
const Task = db.task;

db.sequelize.sync({ force: true }).then(() => {
  initialUsers();
  initialTasks();
});

app.get("/", (req, res) => {
  res.json({ message: `Server running on port ${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initialUsers() {
  User.create({
    id: 1,
    firstname: "Петр",
    lastname: "Петров",
    fathername: "Петрович",
    login: "OlennikovYV",
    password: bcrypt.hashSync("pass1", 8),
    supervisorid: null,
  });
  User.create({
    id: 2,
    firstname: "Сергей",
    lastname: "Соколов",
    fathername: "Петрович",
    login: "SokolovSP",
    password: bcrypt.hashSync("pass2", 8),
    supervisorid: null,
  });
  User.create({
    id: 3,
    firstname: "Иван",
    lastname: "Иванов",
    fathername: "Иванович",
    login: "IvanovII",
    password: bcrypt.hashSync("pass3", 8),
    supervisorid: 1,
  });
  User.create({
    id: 4,
    firstname: "Дмитрий",
    lastname: "Николаев",
    fathername: "Юрьевич",
    login: "NikolaevDY",
    password: bcrypt.hashSync("pass4", 8),
    supervisorid: 1,
  });
  User.create({
    id: 5,
    firstname: "Павел",
    lastname: "Ефимов",
    fathername: "Павлович",
    login: "EfimofPP",
    password: bcrypt.hashSync("pass5", 8),
    supervisorid: 2,
  });
}

function initialTasks() {}
