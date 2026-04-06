const nodemailer = require("nodemailer");

// ✅ Create transporter (SMTP connection)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",

  port: Number(process.env.EMAIL_PORT) || 587,

  secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for 587

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-char app password
  },
});

// ✅ Verify connection (VERY IMPORTANT for debugging)
const verifyEmailServer = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email server is ready to send messages");
  } catch (error) {
    console.error("❌ Email server connection failed:", error);
  }
};

// Run verification once on startup
verifyEmailServer();

// ✅ Send Email Function
const sendEmail = async ({ to, bcc, subject, text, html }) => {
  try {
    if (!to) {
      throw new Error("Recipient email (to) is required");
    }

    const mailOptions = {
      from: `"Locofy App" <${process.env.EMAIL_USER}>`,
      to,
      bcc: bcc || undefined,
      subject,
      text: text || "",
      html: html || "",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📧 Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);

    // VERY IMPORTANT → throw error so you can debug in routes
    throw error;
  }
};

module.exports = { sendEmail };
