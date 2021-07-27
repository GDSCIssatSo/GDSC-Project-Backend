const morgan = require("morgan");

module.exports = (app) => {
  app.use(morgan("common"));
  require("./routes")(app);
  require("./db")();
};
