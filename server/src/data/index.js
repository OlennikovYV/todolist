const db = require("../models");
const User = db.user;
const Task = db.task;
const Priorities = db.priorities;

const dataList = require("./test.data");

function fillTestPriorities() {
  Priorities.bulkCreate(dataList.priorityList, { returning: true });
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
