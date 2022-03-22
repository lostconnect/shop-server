const ApiError = require("../error/ApiError");
const TokenService = require("../services/tokenService");

module.exports = function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorized());
    }

    const accessToken = authorizationHeader.split('Bearer ')[1];
    if (!accessToken) {
      return next(ApiError.unauthorized());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorized());
    }

    req.user = userData;
    return next();
  } catch (e) {
    return next(ApiError.unauthorized());
  }
}
