const morgan = require("morgan");

module.exports = (app) => {
  app.use(morgan("common"));
  require("./swaggerDocs")(app);
  require("./routes")(app);
  require("./db")();
};
