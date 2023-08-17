import nodemailer from "nodemailer";

export const sendMail = (to, subject, templete) => {
  const transporter = nodemailer.createTransport({
    host: "mail.mailtest.radixweb.net",
    port: 465,
    secure: true,
    auth: {
      user: "testphp@mailtest.radixweb.net",
      pass: "Radix@web#8",
    },
  });
  const mailOptions = {
    from: "testphp@mailtest.radixweb.net",
    to: to,
    subject: subject,
    html: templete,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error("Email sending failed");
    }
  });
};
