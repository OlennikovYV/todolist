const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/user/:id/responsible", controller.getResponsible);
  app.get("/api/user/:id/responsible/list", controller.getResponsibleList);
};
