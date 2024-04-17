export const passwordChangeHtml = (link) => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Cambiar Contraseña</title>
    <style>
        body, table {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1e1e1e;
            color: #ffffff;
        }

        .container {
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
            color: white;
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
                <h1>¡Cambia tu contraseña!</h1>
                <p>Hola</p>
                <p>Vemos que quieres cambiar tu contrseña. Para completar el cambio, haz clic en el siguiente botón para poder cambiar tu contraseña:</p>
                <a href="${link}" class="button">Cambiar contraseña</a>
                <p>Si no puedes hacer clic en el botón, puedes copiar y pegar el siguiente enlace en tu navegador web:</p>
                <p><a class="link" href="${link}">${link}</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`