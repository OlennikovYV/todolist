const ApiError = require("../../error/api.error");

module.exports = function (error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.status).send({ message: error.message });
  }

  return res.status(500).send({ message: "Непредвиденная ошибка!" });
};
