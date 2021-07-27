const express = require("express");
const {
  controllerMethodExemple,
} = require("../controllers/exemple.controller");

const router = express.Router();

router.get("/", controllerMethodExemple);

module.exports = router;
