const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/user/responsible", controller.getResponsibleList);
  app.get("/api/user/responsible/:id", controller.getResponsible);
};
