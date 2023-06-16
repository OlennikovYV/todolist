const controller = require("../controllers/task.controller");

module.exports = function (app) {
  app.get("/api/task/:id", controller.taskList);
  app.get("/api/task/:trasaction/add", controller.addTask);
  app.get("/api/task/:trasaction/update/:id", controller.updateTask);
};
