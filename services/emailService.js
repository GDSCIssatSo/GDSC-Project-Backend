const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs/promises");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "at.zahreddine@gmail.com",
    pass: "demscsvwzagesqbn", // naturally, replace both with your real credentials or an application-specific password
  },
});

const sendEmail = async ({ email, subject, payload, template }) => {
  try {
    const source = await fs.readFile(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const html = compiledTemplate(payload);
    const options = {
      from: "at.zahreddine@gmail.com",
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
