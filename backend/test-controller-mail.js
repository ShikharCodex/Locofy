require("dotenv").config();
const { sendEmail } = require("./config/mailer");

(async () => {
  try {
    console.log("Testing full mailer.js exactly out of controller...");
    const emails = "shikharx.dev@gmail.com, vermaraju488@gmail.com";
    
    await sendEmail({
      to: process.env.EMAIL_USER,
      bcc: emails,
      subject: "Test subject PersonController simulation",
      text: "Text body",
      html: "<p>HTML body</p>"
    });
    console.log("SUCCESS!");
  } catch(e) {
    console.error("FAIL:", e);
  }
})();
