const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { getToken, getUser } = require("../auth/token");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const token = getToken(email);
  // console.log(token, email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.net",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.email_user,
      pass: process.env.email_pass,
    },
    // tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: '"Kopal Jain" <projectsamplenodemailer@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Email Verification Test", // Subject line
      text: `Please click on the following link to verify your account : http://localhost:5173/${token}`, // plain text body
      html: `<p>Please click on the following link to verify your account : http://localhost:5173/${token}</p>`, // html body
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

module.exports = router;
