module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status,
    this.errors = errors;
  }

  static UnauthorizedError(message) {
    return new ApiError(401, message);
  }

  static BadRequest(message, errors = []) {
    console.log('BadRequest because of', message);
    return new ApiError(400, message, errors);
  }
}