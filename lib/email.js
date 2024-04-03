import nodeemailer from "nodemailer"

export const email = nodeemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export async function sendVerificationEmail(emailUser, code) {
    await email.sendMail({
        from: `"SplitQ ✌️" <${process.env.EMAIL}>`, // sender address
        to: emailUser, // list of receivers
        subject: "Verifica tu cuenta ✔", // Subject line
        // html: `<a href='${process.env.DOMAIN}/verify/${code}'>haz click aqui</a>`, // html body
        html:`
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    /* Reset default styles */
    body, h1, p, a {
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #ffffff; /* White background */
      color: #4b5563; /* Gray text */
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
    h1 {
      font-size: 1.875rem; /* Equivalent to text-3xl */
      font-weight: bold;
    }
    p {
      max-width: 500px;
      margin: 0 auto;
      margin-bottom: 1rem;
    }
    a {
      display: inline-flex;
      height: 2.5rem;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem; /* Equivalent to rounded-md */
      border: 1px solid #e2e8f0; /* Equivalent to border border-gray-200 */
      background-color: #ffffff; /* White background */
      padding: 0 1rem; /* Equivalent to px-8 */
      font-size: 0.875rem; /* Equivalent to text-sm */
      font-weight: 500; /* Equivalent to font-medium */
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Equivalent to shadow-sm */
      transition: background-color 0.2s, color 0.2s; /* Equivalent to transition-colors */
      text-decoration: none;
      color: #4b5563; /* Gray text */
      outline: none;
    }
    a:hover {
      background-color: #f3f4f6; /* Equivalent to hover:bg-gray-100 */
      color: #111827; /* Equivalent to hover:text-gray-900 */
    }
    a:focus-visible {
      border: 1px solid #111827; /* Equivalent to focus-visible:ring-1 focus-visible:ring-gray-950 */
    }
    a:disabled {
      pointer-events: none; /* Equivalent to disabled:pointer-events-none */
      opacity: 0.5; /* Equivalent to disabled:opacity-50 */
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Estas a un paso de SplitQ</h1>
    <p>Haz click en este boton para verificar tu cuenta</p>
    <div class="flex flex-col gap-2">
      <a href="${process.env.DOMAIN}/verify/${code}">Verify Now</a>
    </div>
  </div>
</body>
</html>
        `
    });
}