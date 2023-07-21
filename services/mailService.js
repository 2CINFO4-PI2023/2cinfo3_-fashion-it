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
        <p>FashionIT</p>
      `,
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
async function sendPasswordEmail(email,username,password) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_MAIL,
      to: email,
      subject: 'You have requested a password reset 🔐',
      html: `
        <h2>Hello, ${username} 😊 </h2>
        <p>Here's your new password:</p>
        <ul>
          <li><b>Password: 🔓</b> ${password}</li>
        </ul>
        <p>Please email us if you did not do this action!! ❌</p>
        <p>FashionIT 🙌</p>
      `,
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendCreationEmail,
  sendPasswordEmail
};
