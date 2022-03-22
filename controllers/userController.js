const {validationResult} = require("express-validator");
const ApiError = require("../error/ApiError");
const UserService = require("../services/userService");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error'));
      }

      const {email, password} = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60, httpOnly: true }); // 10 days
      res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 60, httpOnly: true }); // 30 minutes
      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 10 * 24 * 60 * 60, httpOnly: true }); // 10 days
      res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 60, httpOnly: true }); // 30 minutes
      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }

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
