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

