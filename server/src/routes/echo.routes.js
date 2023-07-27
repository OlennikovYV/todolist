const Router = require("express");
const router = new Router();

const controller = require("../controllers/echo.controller");

router.get("/", controller.echo);

module.exports = router;
