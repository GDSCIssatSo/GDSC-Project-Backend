const mongoose = require("mongoose");
const { body } = require("express-validator");

exports.requestValidation = {
  userid: body("userId")
    .not()
    .isEmpty()
    .withMessage("userId is required")
    .bail()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("userId is not valid"),
  token: body("token")
    .not()
    .isEmpty()
    .withMessage("token is required")
    .bail()
    .isLength({ min: 30, max: 30 })
    .withMessage("token length  must be 30 characters"),
  password: body("password")
    .isLength({ min: 8 })
    .withMessage("password length must be at least 8 characters "),
  email: body("email").isEmail().withMessage("email is invalid"),
};
