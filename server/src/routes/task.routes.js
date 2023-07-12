const controller = require("../controllers/task.controller");

module.exports = function (app) {
  app.post("/api/task/add", controller.addTask);
  app.put("/api/task/update/:id", controller.updateTask);
  app.get("/api/task/priorities", controller.prioritiesList);
  app.get("/api/task/:id", controller.taskList);
};
