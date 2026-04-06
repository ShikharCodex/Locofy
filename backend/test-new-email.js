require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

(async () => {
  try {
    console.log("Testing with user:", process.env.EMAIL_USER);
    // Send email
    const info = await transporter.sendMail({
      from: `"LocofyApp" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test from Server",
      text: "Testing email delivery.",
    });
    console.log("Email sent successfully: ", info.response);
  } catch (error) {
    console.error("Email failed:", error.message);
  }
})();
