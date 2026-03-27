/**
 * Email Service (Placeholder)
 * Wire up with nodemailer or a third-party provider (e.g., SendGrid, Mailgun) as needed.
 */

/**
 * Send an email
 * @param {Object} options - { to, subject, text, html }
 */
const sendEmail = async (options) => {
   if (!options?.to || !options?.subject) {
    throw new Error("Email 'to' and 'subject' are required");
  }
  // TODO: Configure a real transporter, e.g.:
  // const transporter = nodemailer.createTransport({ ... });
  // await transporter.sendMail({ from: process.env.EMAIL_FROM, ...options });

  console.log(`📧 [EmailService] Sending email to: ${options.to}`);
  console.log(`   Subject: ${options.subject}`);
  // Simulate async work
  return Promise.resolve();
};

module.exports = { sendEmail };
