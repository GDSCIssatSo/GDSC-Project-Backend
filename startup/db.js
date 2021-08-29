const mongoose = require("mongoose");
const config = require("config");
module.exports = async function () {
  const DB_URL =
    config.get("DB_URL") || "mongodb://localhost:27017/dsc-project-db";
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("db connection established");
  } catch (e) {
    console.log(e.message);
  }
};
