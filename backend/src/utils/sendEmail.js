const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((err, success) => {
  if (err) console.log("❌ SMTP ERROR:", err.message);
  else console.log("✅ SMTP READY");
});

const sendEmail = async (to, subject, text) => {
  return transporter.sendMail({
    from: `"SplitSync" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
