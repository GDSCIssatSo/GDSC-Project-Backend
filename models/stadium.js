const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Stadium",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    size: {
      type: new mongoose.Schema({
        length: { type: Number, required: true },
        width: { type: Number, required: true },
      }),
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    addresse: {
      type: new mongoose.Schema({
        long: {
          type: Number,
          required: true,
        },
        lat: {
          type: Number,
          required: true,
        },
      }),
      required: true,
    },
  })
);
