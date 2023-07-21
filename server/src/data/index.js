const sequelize = require("../models");
const User = sequelize.models.user;
const Task = sequelize.models.task;
const Priority = sequelize.models.priority;

const dataList = require("./test.data");

function fillTestPriorities() {
  Priority.bulkCreate(dataList.priorityList, { returning: true });
}

function fillTestUsers() {
  User.bulkCreate(dataList.userList, { returning: true });
}

function fillTestTasks() {
  Task.bulkCreate(dataList.taskList, { returning: true });
}

function initData() {
  fillTestPriorities();
  fillTestUsers();
  fillTestTasks();
}

module.exports = initData;
