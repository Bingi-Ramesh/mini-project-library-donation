const nodemailer = require('nodemailer');
require('dotenv').config(); 
// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false, // Use true for SSL, false for TLS
  port: 587, // Port 465 for SSL, 587 for TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  logger: true,  // Log all actions
  debug: true, 
});

const createMail = () => {
  let mailOptions = {
    from: {
      address: process.env.EMAIL,
      name: 'Bing Services'
    }
  };

  const setCompanyName = (name) => {
    mailOptions.from.name = name;
  };

  const setTo = (receiver) => {
    mailOptions.to = receiver;
  };

  const setSubject = (subject) => {
    mailOptions.subject = subject;
  };

  const setText = (text) => {
    mailOptions.text = text;
  };

  const setHtml = (html) => {
    mailOptions.html = html;
  };

  const send = () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
  };

  return {
    setCompanyName,
    setTo,
    setSubject,
    setText,
    setHtml,
    send
  };
};

module.exports = { createMail };
