const { validationResult } = require("express-validator");
const failureResponse = require("../utils/failureResponse");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(failureResponse(errors));
  }
  next();
};
