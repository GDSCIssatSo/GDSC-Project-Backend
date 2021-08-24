const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

module.exports = function (app) {
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
