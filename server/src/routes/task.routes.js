const controller = require("../controllers/task.controller");

module.exports = function (app) {
  app.get("/api/task/:id", controller.taskList);
  app.post("/api/task/add", controller.addTask);
  app.put("/api/task/update/:id", controller.updateTask);
};
