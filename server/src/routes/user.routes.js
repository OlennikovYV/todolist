const Router = require("express");
const router = new Router();

const controller = require("../controllers/user.controller");

router.get("/responsible", controller.getResponsibleList);
router.get("/responsible/:id", controller.getResponsible);

module.exports = router;
