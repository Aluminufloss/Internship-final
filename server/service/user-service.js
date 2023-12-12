const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");

const ApiError = require("../exceptions/api-error");

const fs = require("fs");

class UserService {
  async generateTokens(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async registration(email, password, username) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с таким email ${email} уже зарегистрирован`
      );
    }

    const imagePath = `C:\\Users\\nilch\\Desktop\\Internship\\client\\public\\images\\user"\\user-empthy.png`;

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ email, password: hashPassword, username, imagePath });

    return this.generateTokens(user);
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не был найден");
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    return this.generateTokens(user);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    console.log("Logout-server ", token);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("You don't have a token");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData) {
      throw ApiError.UnauthorizedError("Token didn't validate correctly");
    }

    if (!tokenFromDB) {
      throw ApiError.UnauthorizedError("Token doesn't exist in database");
    }

    const user = await UserModel.findById(userData.id);

    return this.generateTokens(user);
  }

  async getUser(user) {
    if (!user) {
      throw ApiError.UnauthorizedError("Cannot get the user");
    } 

    const userDto = new UserDto(user);
    console.log("User", userDto);
    return { user: userDto };
  }

  async upload(userID, base64String) {
    if (!userID) {
      throw ApiError.BadRequest("Don't have an user id");
    } 

    if (!base64String) {
      throw ApiError.BadRequest("Don't have an base64 image string");
    }
   
    const base64Image = base64String.split(';base64,').pop();

    const buffer = Buffer.from(base64Image, "base64");

    fs.writeFileSync(`D:\\avatar_${userID}.png`, buffer);
  }
}

module.exports = new UserService();
