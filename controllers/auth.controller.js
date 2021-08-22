const bcrypt = require("bcrypt");
const { customAlphabet } = require("nanoid");

const Users = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");

const { sendEmail } = require("../services/emailService");
const { requestValidation } = require("../utils/RequestValidation");
const requestValidationMiddle = require("../middlewares/RequestValidationMiddleware");

const nanoid = customAlphabet("1234567890abcdef", 30);

const requestResetPassword = [
  requestValidation.email,
  requestValidationMiddle,
  async (req, res) => {
    try {
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(404)
          .json({ status: "failure", error: { message: "User not found" } });
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
  requestValidationMiddle,
  async (req, res) => {
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
