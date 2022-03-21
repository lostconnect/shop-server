//подключим
const ApiError = require("../error/ApiError");

class UserController {
  async registration(req, res, next) {

  }

  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;

    //проверка
    if (!id) {
      return next(ApiError.badRequest("Не задан id"));
    }

    res.json({ id });
  }
}

module.exports = new UserController();
