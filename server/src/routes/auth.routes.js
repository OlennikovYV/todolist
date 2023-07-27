const Router = require("express");
const router = new Router();

const controller = require("../controllers/auth.controller");

router.post("/", controller.signin);

module.exports = router;
