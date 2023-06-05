const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/user/:id", controller.getResponsible);
  app.get(
    "/api/user/:user/supervisor/:supervisor",
    controller.getResponsibleList
  );
};
