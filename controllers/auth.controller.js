const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { customAlphabet } = require("nanoid");

const Users = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");

const { sendEmail } = require("../services/emailService");

const nanoid = customAlphabet("1234567890abcdef", 30);

const requestValidation = {
  userid: body("userId")
    .not()
    .isEmpty()
    .withMessage("userId is required")
    .bail()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("userId is not valid"),
  token: body("token")
    .not()
    .isEmpty()
    .withMessage("token is required")
    .bail()
    .isLength({ min: 30, max: 30 })
    .withMessage("token length  must be 30 characters"),
  password: body("password")
    .isLength({ min: 8 })
    .withMessage("password length must be at least 8 characters "),
  email: body("email").isEmail().withMessage("email is invalid"),
};

const requestResetPassword = [
  requestValidation.email,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: { message: "User not found" } });
      }

      await PasswordResetToken.findOne({
        userId: user._id,
      })
        .deleteOne()
        .exec();

      const token = nanoid();
      const passwordResetToken = new PasswordResetToken({
        userId: user._id,
        token,
      });

      await passwordResetToken.save();
      await sendEmail({
        email: user.email,
        payload: {
          name: user.name,
          link: `localhost:3000/passwordReset?token=${token}&userId=${user._id}`,
        },
        subject: "Reset Password Request",
        template: "../templates/mails/requestResetPassword.handlebars",
      });
      res.status(200).json({ status: "success" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ status: "failure", error: "server error" });
    }
  },
];

const validateResetPasswordRequest = [
  [
    requestValidation.userid,
    requestValidation.token,
    requestValidation.password,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const user = await PasswordResetToken.findOne({
      userId: req.body.userId,
      token: req.body.token,
    })
      .populate("userId")
      .select("userId");

    if (!user) {
      return res.status(404).json({
        status: "failure",
        error: "token is expired or doesn't exists ",
      });
    }
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await PasswordResetToken.deleteOne({
      userId: req.body.userId,
      token: req.body.token,
    });

    await Users.findByIdAndUpdate(req.body.userId, {
      $set: { password: newPassword },
    });

    res.status(200).json({ status: "success" });
  },
];

module.exports = {
  requestResetPassword,
  validateResetPasswordRequest,
};
