const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log("Header", req.headers);

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError("Authorization Header doesn't exist"));
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError("You don't have an access token"));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    
    if (!userData) {
      return next(ApiError.UnauthorizedError("Your access token haven't validated correct"));
    }

    console.log("Mussaka", userData);

    req.user = userData;
    next();
  } catch (err) {
    return next(err);
  }
};
