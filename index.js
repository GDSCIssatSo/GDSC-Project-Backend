const express = require("express");
const app = express();
const user = require('./routes/user');

require("./startup/index")(app);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server is running on port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user',user)