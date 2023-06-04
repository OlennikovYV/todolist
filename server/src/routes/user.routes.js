const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/user/:id", controller.getResponsible);
};
