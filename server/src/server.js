const express = require("express");
const bodyParser = require("body-parser");

const dataList = require("./data/test-data");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const User = db.user;
const Task = db.task;

db.sequelize.sync({ force: true }).then(() => {
  fillTestUsers();
  fillTestTasks();
});

app.get("/", (req, res) => {
  res.json({ message: `Server running on port ${PORT}` });
});

require("./routes/auth.routes")(app);
require("./routes/task.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function fillTestUsers() {
  User.bulkCreate(dataList.userList, { returning: true });
}

function fillTestTasks() {
  Task.bulkCreate(dataList.taskList, { returning: true });
}
