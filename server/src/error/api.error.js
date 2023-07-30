function ApiError(status, message) {
  this.status = status;
  this.message = message;
}

ApiError.Unauthorized = (message) => new ApiError(401, message);
ApiError.Internal = (message) => new ApiError(500, message);

module.exports = ApiError;
