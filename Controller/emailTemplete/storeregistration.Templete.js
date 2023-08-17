export const storeEmailTemplete = (Email, Password) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>New Admin Registration</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #007bff;
      }
      img.logo {
        max-width: 150px;
        margin-bottom: 20px;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        margin-bottom: 10px;
      }
      strong {
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        font-size: 0.8em;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img
        src="https://dmart-4082.s3.ap-south-1.amazonaws.com/D-mart+Images/DMART.NS_BIG.png"
        alt="Logo"
        class="logo"
      />
      <h2>New Admin Registration</h2>
      <p>Hello admin,</p>
      <p>
        Congratulations! You have been registered as an admin by the superadmin.
      </p>
      <p>Your credentials for accessing the admin panel are:</p>
      <ul>
        <li><strong>Email:</strong> ${Email}</li>
        <li><strong>Password:</strong> ${Password}</li>
      </ul>
      <p>
        Please keep these credentials secure and do not share them with anyone.
      </p>
      <p>Thank you!</p>
      <p>Sincerely,</p>
      <p>The Superadmin Team</p>
      <footer class="footer">
        <p class="footer-text">
          This email was sent to you by <strong>D-Mart</strong>. If you have any
          questions or concerns, please contact our support team at
          <a href="mailto:dmart@gmail.com">dmart@gmail.com</a>.
        </p>
        <p class="footer-text">
          Connect with us:
          <a href="[Your Social Media Link]">Facebook</a> |
          <a href="[Your Social Media Link]">Twitter</a> |
          <a href="[Your Social Media Link]">LinkedIn</a>
        </p>
      </footer>
    </div>
  </body>
</html>
`;
};
