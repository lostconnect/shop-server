const Product = require("../models/product");

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
    let { limit, page } = req.query;
    limit = limit || 2;
    page = page || 1;

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

  async delete(req, res) {
    const { id } = req.params;
    Product.deleteOne({id}).then(() => {
      console.log("deleted");
    });
    return res.json({ message: "removed" });
  }
}

module.exports = new ProductController();
