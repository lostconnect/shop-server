const Router = require("express");
const router = Router();
const ProductController = require("../controllers/productController");

router.post("/create", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);

module.exports = router;
