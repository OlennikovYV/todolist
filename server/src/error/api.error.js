class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static Unauthorized(message) {
    return new ApiError(401, message);
  }

  static Internal(message) {
    return new ApiError(401, message);
  }
}

module.exports = ApiError;
