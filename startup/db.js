const mongoose = require("mongoose");

module.exports = async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017/dsc-project-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connection established");
  } catch (e) {
    console.log(e.message);
  }
};
