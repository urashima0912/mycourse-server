const nodemailer = require("nodemailer");
const config = require("../config");

async function send(email, content, subject = "") {
  try {
    const transporter = nodemailer.createTransport(config.email);

    await transporter.sendMail({
      from: "mycourse@course.org",
      to: email,
      subject,
      html: content,
    });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  send,
};
