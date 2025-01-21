import nodemailer from "nodemailer";
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: `"Saraha App"<${process.env.EMAIL_USER}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line // plain text body
    html: html, // html body
  });
  return info.rejected.length == 0 ? true : false;
};
export const subjects = {
  register: "Activate Account",
  resetPassword: "Reset Password",
};
