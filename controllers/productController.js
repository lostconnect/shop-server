const Product = require("../models/product");
const ApiError = require("../error/ApiError");

class ProductController {
  async create(req, res) {
    const { title, description } = req.body;
    const product = {
      title,
      description,
    };
    const response = await Product.create(product);
    return res.json(response);
  }

  async getAll(req, res) {
    let { limit = 2, page = 1 } = req.query;

    let skip = page * limit - limit;
    const count = await Product.count();
    const products = await Product.find().limit(limit).skip(skip);
    return res.json({ count, products });
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.json(product);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const result = await Product.deleteOne({id});
    if (result.deletedCount) {
      return res.json({ message: "removed" });
    }
    return next(ApiError.badRequest(`Product with id ${id} does not exist`));
  }
}

module.exports = new ProductController();
