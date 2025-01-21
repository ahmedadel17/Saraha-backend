export const emailTemplate = ({ link, username, title, button }) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 20px;
      text-align: center;
    }
    .email-container img {
      width: 60px;
      height: 60px;
    }
    .email-header {
      font-size: 24px;
      font-weight: bold;
      margin: 10px 0;
    }
    .email-header span {
      font-size: 28px;
    }
    .email-body {
      font-size: 16px;
      color: #555555;
      margin: 20px 0;
    }
    .email-button {
      background-color: #31beb6;
      color: #ffffff;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin: 20px 0;
    }
    .email-footer {
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eeeeee;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <img src="https://s.yimg.com/fz/api/res/1.2/GfP66hRH55P9ghQRoVzQhw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTEyMDtxPTgwO3c9MTIw/https://s.yimg.com/zb/imgv1/a193d466-9d02-326a-95f8-f280a47a2b21/t_500x300" alt="Logo">
    <h1 class="email-header">Hello ${username}</h1>
    <h3 class="email-header">${title} </h3>

    <p class="email-body">
      To use ${process.env.APP_NAME}, click the verification button. This helps keep your account secure.
    </p>
    <a href="${link}" class="email-button">${button}</a>
    <p class="email-body">
      You're receiving this email because you have an account in ${process.env.APP_NAME}. If you are not sure why you're receiving this, please contact us by replying to this email.
    </p>
    <p class="email-footer">
      Email specialists use ${process.env.APP_NAME}'s intuitive tool to design emails for desktop and mobile, and let our smart algorithm generate HTML for use in their ESPs.
    </p>
  </div>
</body>
</html>
`;
};
