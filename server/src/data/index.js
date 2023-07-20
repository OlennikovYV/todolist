const db = require("../models");
const User = db.user;
const Task = db.task;
const Priority = db.priority;

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
