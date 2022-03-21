const Router = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController.js");
const router = Router();

router.post("/registration",
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 24 }),
    userController.registration
);
router.post("/login", userController.login);
router.get("/auth", userController.check);

module.exports = router;
