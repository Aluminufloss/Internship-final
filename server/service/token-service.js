const jwt = require("jsonwebtoken");
const tokenModel = require("../models/Token")

class TokenService {
  generateTokens(payload) {
    console.log("New tokens");
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m", // move to constants
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d", // move to constants
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      console.log("Token save");
      tokenData.refreshToken = refreshToken;
      return tokenData.save()
    }

    const token = await tokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const sus = refreshToken;
    // console.log("Refresh", sus)
    const tokenData = await tokenModel.findOne( { refreshToken: sus } );
    // console.log("token data ", tokenData);
    return tokenData;
  }
}

module.exports = new TokenService();
