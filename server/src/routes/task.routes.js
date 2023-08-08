const Router = require("express");
const router = new Router();

const controller = require("../controllers/task.controller");

router.post("/add", controller.addTask);
router.put("/update/:id", controller.updateTask);
router.get("/priorities", controller.prioritiesList);
router.get("/:id/:page/:limit/:sort/:order", controller.taskList);
module.exports = router;
