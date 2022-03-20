const Router = require("express");
const router = new Router();

const userRuoter = require("./userRuoter");
const productRuoter = require("./productRuoter");

router.use("/user", userRuoter);
router.use("/product", productRuoter);

module.exports = router;