const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const config = require("config");
const fs = require("fs/promises");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: config.get("MAIL.HOST"),
  port: config.get("MAIL.PORT"),
  secure: true,
  auth: {
    user: config.get("MAIL.USER"),
    pass: config.get("MAIL.PASS"), // naturally, replace both with your real credentials or an application-specific password
  },
});

const sendEmail = async ({ email, subject, payload, template }) => {
  try {
    const source = await fs.readFile(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const html = compiledTemplate(payload);
    const options = {
      from: config.get("MAIL.USER"),
      to: email,
      subject,
      html,
    };
    return await transporter.sendMail(options);
  } catch (e) {
    console.log(e.message);
    throw new Error("Failed to send mail to " + email);
  }
};

module.exports = { sendEmail };
