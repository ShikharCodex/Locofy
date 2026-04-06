const { Resend } = require('resend');

// ✅ Initialize Resend with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Send Email Function
const sendEmail = async ({ to, bcc, subject, text, html }) => {
  try {
    if (!to) {
      throw new Error("Recipient email (to) is required");
    }

    // Resend prefers BCC as an array of properly formatted strings
    let bccArray = undefined;
    if (bcc) {
      bccArray = bcc.split(',').map(email => email.trim()).filter(email => email.length > 0);
    }

    const { data, error } = await resend.emails.send({
      // ⚠️ IMPORTANT: If you haven't verified a custom domain on Resend, you must use onboarding@resend.dev
      from: 'LocofyAlerts <onboarding@resend.dev>',
      to: [to],
      bcc: bccArray,
      subject: subject,
      html: html || text,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw new Error(error.message);
    }

    console.log("📧 Email sent successfully via Resend API:", data.id);
    return data;

  } catch (error) {
    console.error("❌ Error running Resend email:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
