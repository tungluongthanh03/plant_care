import nodeMailer from "nodemailer";

// send email with verification link
export const sendMail = async (email, subject, name, verificationLink) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject,
    html: mailTemplate(name, verificationLink)
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

// create content for email
const mailTemplate = (name, verificationLink) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Hello, ${name}!</h2>
    <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
    <a class="button" href="${verificationLink}" target="_blank">Verify Email</a>
    <p>If the button doesn't work, copy and paste the following link into your browser:</p>
    <p>${verificationLink}</p>
    <hr>
    <p class="footer">If you didn’t request this email, you can ignore it.</p>
  </div>
</body>
</html>
`; 

