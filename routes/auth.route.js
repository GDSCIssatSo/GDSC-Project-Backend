const express = require("express");
const {
  requestResetPassword,
  validateResetPasswordRequest,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/auth/request-reset-password", requestResetPassword);
router.post("/auth/validate-reset-password", validateResetPasswordRequest);
module.exports = router;
