const Router = require("express");
const router = new Router();

const authRouter = require("./auth.routes");
const echoRoutes = require("./echo.routes");
const taskRouter = require("./task.routes");
const userRouter = require("./user.routes");

router.use("/auth", authRouter);
router.use("/echo", echoRoutes);
router.use("/task", taskRouter);
router.use("/user", userRouter);

module.exports = router;
