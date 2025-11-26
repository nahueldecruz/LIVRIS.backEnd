const getVerifyEmailHTML = (name, route) => {
    const verifyEmailHTML = `
    <div style="margin:0; padding:0; background:#f4f4f4; width:100%; font-family: Arial, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td align="center" style="padding: 20px 0;">

                <table role="presentation" cellspacing="0" cellpadding="0" width="600" style="background:#ffffff; border-radius:0.4rem; border:1px solid rgba(0,0,0,0.2); padding:0; overflow:hidden;">

                <tr>
                    <td style="background:#5565EB; padding: 30px; text-align:center; color:#ffffff;">
                    <h1 style="margin:0; font-size:2rem; font-family: ui-serif, Georgia, serif;">LiVris</h1>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 30px; display:flex; flex-direction:column; gap:1rem;">
                    <h2 style="margin:0; font-size:1.5rem; font-family: ui-serif, Georgia, serif; color:#5565EB; text-align:center;">
                        Recuperá tu contraseña
                    </h2>

                    <p style="margin:0; font-size:1rem; color:#292524; line-height:1.6; text-align:center;">
                        Hola <strong style="color:#5565EB;">${name}</strong>, recibimos una solicitud para restablecer tu contraseña.
                    </p>

                    <p style="margin:0; font-size:1rem; color:#292524; line-height:1.6; text-align:center;">
                        Si fuiste vos, podés continuar desde el siguiente botón.
                    </p>

                    <div style="text-align:center; margin-top:1.5rem;">
                        <a href="${route}"
                        style="
                            display:inline-block;
                            padding:1rem 1.5rem;
                            font-size:1.25rem;
                            background:#ffffff;
                            color:#5565EB;
                            border:1px solid rgba(0,0,0,0.2);
                            border-radius:0.4rem;
                            text-decoration:none;
                            font-family: Arial, sans-serif;
                        ">
                        Recuperar contraseña
                        </a>
                    </div>

                    <p style="margin-top:2rem; font-size:0.95rem; color:#292524; text-align:center; line-height:1.6;">
                        El enlace es válido por tiempo limitado para proteger tu seguridad.
                    </p>

                    <p style="margin:0; font-size:0.95rem; color:#292524; text-align:center; line-height:1.6;">
                        Si no solicitaste este cambio, ignorá este mensaje.
                    </p>

                    <div style="margin-top:2rem; background:#ffffff; border-left:4px solid #5565EB; padding:1rem; border-radius:0.4rem; font-size:0.9rem; color:#292524;">
                        <p style="margin:0; line-height:1.5;">No compartas este enlace con nadie.</p>
                    </div>
                    </td>
                </tr>

                <tr>
                    <td style="background:#f4f4f4; padding: 25px; text-align:center;">
                    <p style="margin:0; font-size:0.9rem; color:#292524;">¿Necesitás ayuda?</p>
                    <a href="mailto:soporte@libris.com"
                        style="font-size:1rem; color:#5565EB; text-decoration:none;">
                        soporte@libris.com
                    </a>
                    </td>
                </tr>

                <tr>
                    <td style="background:#5565EB; text-align:center; padding:20px; color:#ffffff; font-size:0.85rem;">
                    <p style="margin:0;">© ${new Date().getFullYear()} LiVris</p>
                    </td>
                </tr>

                </table>

            </td>
            </tr>
        </table>
        </div>
    `

    return verifyEmailHTML
}

export default getVerifyEmailHTML