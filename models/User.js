const Joi = require("joi").extend(require('@joi/date'));
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["normal", "moderator", "admin"],
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    avatar: {
      type: String,
    },
  })
);

module.exports.User = User;

function validateUser (user) {
    const schema = Joi.object ({
        username : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(50).required().email().required(),
        password : Joi.string().min(5).max(255).required(),
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        role: Joi.string().valid("normal", "moderator", "admin").required(),
        address: Joi.string(),
        phoneNumber: Joi.number().min(10000000).max(99999999).message('PhoneNumber must be 8 digits.'),
        gender: Joi.string().valid('male', 'female'),
        birthDate: Joi.date().format('YYYY-MM-DD').min("1900-01-01"),
        avatar: Joi.string()
    });

    return schema.validate(user);
}

function validateUserId(userId) {
    const schema = Joi.object ({
        id : Joi.objectId().message('Invalid id - '+ userId.id)
    });
    return schema.validate(userId);
}

module.exports.validateUser = validateUser;
module.exports.validateUserId = validateUserId;