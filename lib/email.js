import nodeemailer from "nodemailer"

export const email = nodeemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASS
  }
})

export async function sendVerificationEmail(emailUser, code) {
  await email.sendMail({
    from: `"SplitQ ✌️" <splitqdev@outlook.com>`, // sender address
    to: emailUser, // list of receivers
    subject: "Verifica tu cuenta ✔", // Subject line
    html: html(`${process.env.DOMAIN}/verify/${code}`)
  });
}


const html = (link) => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Verificación de cuenta</title>
    <style>
        body, table {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1e1e1e;
            color: #ffffff;
        }

        .container {
            width: 600px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #666666;
            background-color: #292929;
        }

        h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #ffffff;
        }

        p {
            line-height: 1.6;
            margin-bottom: 12px;
        }

        a.button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }

        a.button:hover {
            background-color: #0056b3;
        }

        .link {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <table class="container" cellpadding="20" cellspacing="0">
        <tr>
            <td>
                <h1>¡Verifica tu cuenta!</h1>
                <p>Hola</p>
                <p>Gracias por registrarte en SplitQ. Para completar tu registro, haz clic en el siguiente botón para verificar tu dirección de correo electrónico:</p>
                <a href="${link}" class="button">Verificar cuenta</a>
                <p>Si no puedes hacer clic en el botón, puedes copiar y pegar el siguiente enlace en tu navegador web:</p>
                <p><a class="link" href="${link}">${link}</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`