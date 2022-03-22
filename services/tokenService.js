const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken
    }
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ userId, refreshToken });
    return token;
  }

  async removeRefreshToken(refreshToken) {
    const result = await TokenModel.deleteOne({ refreshToken });
    return result;
  }
}

module.exports = new TokenService();
