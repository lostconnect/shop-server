const Router = require("express");
const router = Router();
const ProductController = require("../controllers/productController");

router.post("/create", ProductController.create);
router.get("/all", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.get("/delete/:id", ProductController.delete);

module.exports = router;
