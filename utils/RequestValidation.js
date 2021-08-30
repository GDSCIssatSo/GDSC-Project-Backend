const mongoose = require("mongoose");
const { body, param } = require("express-validator");

exports.requestValidation = {
  userId: param("id")
    .not()
    .isEmpty()
    .withMessage("userId is required")
    .bail()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("userId is not valid"),
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
  username: body("username")
    .not()
    .isEmpty()
    .withMessage("username is required")
    .isLength ({ min: 5})
    .withMessage("usename length must be at least 8 characters")
    .isLength ({ max:30})
    .withMessage("usename length must be less than 30 characters"),
  firstName: body("firstName")
    .not()
    .isEmpty()
    .withMessage("firstName is required")
    .isLength ({ min: 5})
    .withMessage("firstName length must be at least 8 characters")
    .isLength ({ max:30})
    .withMessage("firstName length must be less than 30 characters"),
  lastName: body("lastName")
    .not()
    .isEmpty()
    .withMessage("lastName is required")
    .isLength ({ min: 5})
    .withMessage("lastName length must be at least 8 characters")
    .isLength ({ max:30})
    .withMessage("lastName length must be less than 30 characters"),
  role: body("role")
    .not()
    .isEmpty()
    .withMessage("role is required")
    .isIn(["normal", "moderator", "admin"])
    .withMessage("role value must be one of the following: [ normal, moderator, admin ]"),
  address: body("address"),
  phoneNumber : body("phoneNumber")
    .isNumeric()
    .withMessage("phoneNumber must be all numeric")
    .isLength({ min: 8, max: 8 })
    .withMessage("PhoneNumber must be 8 digits"),
  gender: body("gender")
    .isIn(["female", "male"])
    .withMessage("gender can be male or female"),
  birthDate: body("birthDate")
    .isISO8601()
    .withMessage("birthDate must be in this format YYYY-MM-DD")
    .isBefore("2015-12-31")
    .withMessage("birthDate can't be after 2015-12-31")
    .isAfter("1921-01-01")
    .withMessage("birthDate can't be before 1921-01-01")
};
