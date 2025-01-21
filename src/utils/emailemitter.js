import { EventEmitter } from "events";
import { sendEmail, subjects } from "../utils/sendEmail.js";
import { emailTemplate } from "../utils/emailtemplate.js";
export const emailEmitter = new EventEmitter();
emailEmitter.on("sendEmail", async (email, userName, link) => {
  const isSent = await sendEmail({
    to: email,
    subject: subjects.register,
    html: emailTemplate({
      link: link,
      username: userName,
      title: "Please activate your account",
      button: "Activate Account",
    }),
  });
});
emailEmitter.on("resetPassword", async (email, userName, link) => {
  const isSent = await sendEmail({
    to: email,
    subject: subjects.resetPassword,
    html: emailTemplate({
      link: link,
      username: userName,
      title: "Reset Password",
      button: "Reset Password",
    }),
  });
});
