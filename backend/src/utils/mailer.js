const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
});

async function sendMail({ to, subject, html }) {
  try {
    if (!process.env.SMTP_USER) { logger.warn('SMTP not configured — skipping email'); return null; }
    return await transporter.sendMail({
      from: process.env.MAIL_FROM || 'no-reply@maztravel.ma',
      to: to || process.env.MAIL_TO, subject, html,
    });
  } catch (err) { logger.error('Mail error: ' + err.message); return null; }
}

module.exports = { sendMail };
