module.exports = (app) => {
  app.use(require("../routes/auth.route"));
  app.use('/user',require('../routes/user'));
};
