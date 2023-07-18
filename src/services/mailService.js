const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.GOOGLE_SMTP,
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_SECRET,
  },
});

async function sendCreationEmail(user) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_MAIL,
      to: user.email,
      subject: 'Welcome abroad 👋',
      html: `
        <h2>Welcome, ${user.username}! 😊 </h2>
        <p>Thank you for joining our platform. <br>Here are your account details:</p>
        <ul>
          <li><b>Username:</b> ${user.username}</li>
          <li><b>Password:</b> ${user.password}</li>
        </ul>
        <p>We hope you enjoy your experience with us!  🙌</p>
        <p>Mohamed Ben Abdallah</p>
      `,
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendCreationEmail;
