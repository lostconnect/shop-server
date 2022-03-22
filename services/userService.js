const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const ApiError = require("../error/ApiError");
const tokenService = require("../services/tokenService");
const UserDto = require("../dto/userDto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email});
    if (candidate) {
      throw ApiError.badRequest('User with same email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ email, password: hashPassword });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens
    }
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.badRequest(`User with email ${email} does not exists`);
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.badRequest("Wrong password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
    return {
      user: userDto,
      ...tokens
    }
  }
}

module.exports = new UserService();
