const getVerifyEmailHTML = (name, route) => {
    const verifyEmailHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verificá tu email</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background: #f4f4f4;
                width: 100%;
                font-family: Arial, sans-serif;
            }

            .container {
                width: 600px;
                background: #ffffff;
                border-radius: 0.4rem;
                border: 1px solid rgba(0,0,0,0.2);
                overflow: hidden;
            }

            .header {
                background: #5565EB;
                padding: 30px;
                text-align: center;
                color: #ffffff;
            }

            .header h1 {
                margin: 0;
                font-size: 2rem;
                font-family: ui-serif, Georgia, serif;
            }

            .title {
                margin: 0;
                font-size: 1.5rem;
                font-family: ui-serif, Georgia, serif;
                color: #5565EB;
                text-align: center;
            }

            .text {
                margin: 0;
                font-size: 1rem;
                color: #292524;
                line-height: 1.6;
                text-align: center;
            }

            .button {
                display: inline-block;
                padding: 1rem 1.5rem;
                font-size: 1.25rem;
                background: #ffffff;
                color: #5565EB;
                border: 1px solid rgba(0,0,0,0.2);
                border-radius: 0.4rem;
                text-decoration: none;
                font-family: Arial, sans-serif;
            }

            .info-box {
                margin-top: 2rem;
                background: #ffffff;
                border-left: 4px solid #5565EB;
                padding: 1rem;
                border-radius: 0.4rem;
                font-size: 0.9rem;
                color: #292524;
                line-height: 1.5;
            }

            .footer-light {
                background: #f4f4f4;
                padding: 25px;
                text-align: center;
            }

            .footer-dark {
                background: #5565EB;
                text-align: center;
                padding: 20px;
                color: #ffffff;
                font-size: 0.85rem;
            }
        </style>
        </head>
        <body>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td align="center" style="padding: 20px 0;">

                        <table role="presentation" class="container" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="header">
                                    <h1>LiVris</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 30px;">
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td>
                                                <h2 class="title">Verificá tu email</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 15px;">
                                                <p class="text">
                                                    Hola <strong style="color:#5565EB;">${name}</strong>, gracias por registrarte en LiVris.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 10px;">
                                                <p class="text">Para activar tu cuenta, hacé clic en el siguiente botón.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding-top: 25px;">
                                                <a href="${route}" class="button">Verificar email</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 30px;">
                                                <p class="text">
                                                    Este enlace es válido por tiempo limitado para proteger tu seguridad.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 10px;">
                                                <p class="text">Si no creaste esta cuenta, ignorá este mensaje.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 20px;">
                                                <table width="100%" class="info-box" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <p style="margin:0;">No compartas este enlace con nadie.</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer-light">
                                    <p style="margin:0; font-size:0.9rem; color:#292524;">¿Necesitás ayuda?</p>
                                    <a href="mailto:soporte@libris.com"
                                    style="font-size:1rem; color:#5565EB; text-decoration:none;">
                                        soporte@libris.com
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer-dark">
                                    © ${new Date().getFullYear()} LiVris
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

        </body>
        </html>
    `

    return verifyEmailHTML
}

export default getVerifyEmailHTML