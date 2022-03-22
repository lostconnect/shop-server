const Router = require("express");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = new Router();

router.use("/user", userRouter);
router.use("/product", authMiddleware, productRouter);

module.exports = router;
