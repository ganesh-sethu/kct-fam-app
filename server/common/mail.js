const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (emails, subject, text, html) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "jeanette.lockman78@ethereal.email",
      pass: "xzzPFnNgK4pWJqPkvS",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "kct-fam@kct.ac.in", // sender address
    to: emails.map((item) => item + " , "), // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendMail;
