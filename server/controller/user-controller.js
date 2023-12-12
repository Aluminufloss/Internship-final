const ApiError = require("../exceptions/api-error");
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

  // @handleCtrlErrors
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
      console.log("suka", refreshToken);
      const userData = await userSevice.refresh(refreshToken);

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

      await userSevice.upload(userID, base64String);

      return res.json("Success");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserContoller();
