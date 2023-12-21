const bcrypt = require("bcrypt");

const UserModel = require("../models/User");
const BookModel = require("../models/Book");

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

    const imagePath = `C:\\Users\\nilch\\Desktop\\Internship\\client\\public\\images\\user\\user-empthy.png`;

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      email,
      password: hashPassword,
      username,
      imagePath,
    });

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
    return { user: userDto };
  }

  async upload(userID, base64String) {
    if (!userID) {
      throw ApiError.BadRequest("Don't have an user id");
    }

    const userFromDB = await UserModel.findOne({ _id: userID });

    if (!base64String) {
      throw ApiError.BadRequest("Don't have an base64 image string");
    }

    const base64Image = base64String.split(";base64,").pop();

    const buffer = Buffer.from(base64Image, "base64");

    fs.writeFileSync(
      `/home/fusion/Desktop/Internship-final/client/public/images/user/avatar_${userID}.png`,
      buffer
    );
    const imagePath = `/images/user/avatar_${userID}.png`;

    await UserModel.updateOne({ email: userFromDB.email }, { imagePath });

    const userWithNewData = await UserModel.findOne({ _id: userID });

    return userWithNewData;
  }

  async change(user, email, password, username) {
    const userFromDB = await UserModel.findOne({ email: user.email });
    console.log("sussy User", userFromDB);
    if (!userFromDB) {
      throw ApiError.BadRequest("Пользователь с таким email не был найден");
    }

    const newEmail = email || userFromDB.email;
    const newUserName = username ?? userFromDB.username;
    const newPassword = password ?? "";

    if (newPassword) {
      const isPassEqual = await bcrypt.compare(
        newPassword,
        userFromDB.password
      );

      if (isPassEqual) {
        throw ApiError.BadRequest("Новый пароль совпадает с старым");
      }

      const hashPassword = await bcrypt.hash(newPassword, 3);

      await UserModel.updateOne(
        { email: userFromDB.email },
        { password: hashPassword }
      );
    }

    await UserModel.updateOne(
      { email: user.email },
      { email: newEmail, username: newUserName },
      { new: true }
    );

    const userWithNewData = await UserModel.findOne({ _id: userFromDB._id });

    return userWithNewData;
  }

  async getFavorite(id) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким id не был найден");
    }

    const favoriteBooks = [];

    for (let id of user.favoriteBooks) {
      const book = await BookModel.findOne({ _id: id }); 
      favoriteBooks.push(book);
    }

    return favoriteBooks;
  }

  async getCart(id) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким id не был найден");
    }

    const cart = [];

    for (let id of user.cart) {
      const book = await BookModel.findOne({ _id: id }); 
      cart.push(book);
    }

    return cart;
  }

  async addFavorite(id, bookID) {
    await UserModel.updateOne({ _id: id }, { $push: { favoriteBooks: bookID } });
  }

  async deleteFavorite(id, bookID) {
    await UserModel.updateOne({ _id: id}, { $pull: { favoriteBooks: bookID } });
  }

  async deleteFromCart(id, bookID) {
    try {
      console.log("bookID", bookID)
      const result = await UserModel.updateOne({ _id: id }, { $pull: { cart: bookID } });
  
      if (result.nModified === 0) {
        console.log(`No matching element found in the cart for user with id ${id}.`);
      } else {
        console.log(`Book with ID ${bookID} removed from the cart for user with id ${id}.`);
      }
    } catch (err) {
      console.error('Error delete from cart:', err);
    }
  }

  async addToCart(id, bookID) {
    try {
      const user = await UserModel.findOne({_id: id});
      if (!user) {
        throw ApiError.BadRequest("Пользователь с таким id не был найден");
      }

      if (user.cart.includes(bookID)) return;

      const result = await UserModel.updateOne({ _id: id }, { $push: { cart: bookID } });
      const book = await BookModel.findOne({ _id: bookID });
  
      if (result.nModified === 0) {
        console.log(`No matching element found in the cart for user with id ${id}.`);
      } else {
        console.log(`Book with ID ${bookID} added to the cart for user with id ${id}.`);
      }

      return book;
    } catch (err) {
      console.error('Error add from cart:', err);
    }
  }
}

module.exports = new UserService();
