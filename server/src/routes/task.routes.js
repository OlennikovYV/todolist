const Router = require("express");
const router = new Router();

const controller = require("../controllers/task.controller");

router.post("/add", controller.addTask);
router.get("/priorities", controller.prioritiesList);
router.put("/update/:id", controller.updateTask);
router.get("/", controller.taskList);
module.exports = router;
