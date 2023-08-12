const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

// Send an email
transporter.sendMail({
  from: '"John Smith" jsmith@example.com',
  to: '"Jane Doe" jane.doe@example.com',
  subject: 'This is a test email',
  text: 'This is the body of the email.',
});
