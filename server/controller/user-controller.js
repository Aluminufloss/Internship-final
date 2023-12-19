const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");
const userSevice = require("../service/user-service");

const { validationResult } = require("express-validator");

class UserContoller {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const { email, password, username } = req.body;
      const userData = await userSevice.registration(email, password, username);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("accessToken", userData.accessToken, {
        maxAge: 1 * 1 * 15 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userSevice.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie("accessToken", userData.accessToken, {
        maxAge: 1 * 1 * 15 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userSevice.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = await userSevice.refresh(refreshToken);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const refreshToken = req.headers.token;
      const userData = await userSevice.getUser(req.user);

      return res.json({ user: userData.user, refreshToken, accessToken });
    } catch (err) {
      next(err);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const userID = req.body.id;
      const base64String = req.body.image;

      const user = await userSevice.upload(userID, base64String);

      console.log("User", user.imagePath);
      return res.json({ imagePath: user.imagePath });
    } catch (err) {
      next(err);
    }
  }

  async changeInfo(req, res, next) {
    try {
      const { user, newEmail, newPassword, newUsername } = req.body;
      console.log("afdasfadssffdssfdsfd", req.body);

      const userWithNewData = await userSevice.change(user, newEmail, newPassword, newUsername);

      return res.json(userWithNewData);
    } catch (err) {
      next(err);
    }
  }

  async getFavorite(req, res, next) {
    try {
      const favoriteBooks = await userService.getFavorite(req.user.id);
      return res.json(favoriteBooks);
    } catch (err) {
      next(err);
    }
  }

  async addFavorite(req, res, next) {
    try {
      const favoriteBook = await userService.addFavorite(req.user.id, req.body.bookID);
      return res.json(favoriteBook);
    } catch (err) {
      next(err);
    }
  }

  async deleteFavorite(req, res, next) {
    try {
      const favoriteBook = await userService.deleteFavorite(req.user.id, req.body.bookID);
      return res.json(favoriteBook);
    } catch (err) {
      next(err);
    }
  }

  async getCart(req, res, next) {
    try {
      const cart = await userService.getCart(req.user.id);
      return res.json(cart);
    } catch (err) {
      next(err);
    }
  }

  async deleteFromCart(req, res, next) {
    try {
      await userService.deleteFromCart(req.user.id, req.body.bookID);
      return res.json("Success");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserContoller();
