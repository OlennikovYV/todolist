const controller = require("../controllers/task.controller");

module.exports = function (app) {
  app.get("/api/task/:id", controller.allTaskList);
};
