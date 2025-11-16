import ENVIRONMENT from '../config/environment.config.js'
import AuthService from '../services/auth.service.js'

class AuthController {

    static async register(request, response, next) {
        try {
            const { name, email, password } = request.body
            
            await AuthService.register({ name, password, email })
            
            return response.status(201).json({
                ok: true,
                status: 201,
                message: 'Usuario registrado con éxito'
            })
            
        } catch(error) {
            next(error)
        }
    }

    static async login(request, response, next) {
        try {
            const { email, password } = request.body

            const data = await AuthService.login({ email, password })

            return response.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuario logueado con éxito',
                data: {
                    authorizationToken: data.authorizationToken,
                    user: data.user
                }
            })
        } catch(error) {
            next(error)
        }
    }

    static async verifyEmail(request, response, next) {
        try {
            const { verification_token: verificationToken } = request.params

            await AuthService.verifyEmail(verificationToken)
            
            return response.redirect(`/${ENVIRONMENT.URL_FRONTEND}/verified-email`)
        } catch(error) {
            next(error)
        }
    }

    static async forgotPassword(request, response, next) {
        try {
            const { email } = request.body

            await AuthService.forgotPassword(email)

            return response.status(200).json({
                ok: true,
                status: 200,
                message: "Email de recuperación enviado con éxito"
            })
        } catch(error) {
            next(error)
        }
    }

    static async resetPassword(request, response, next) {
        try {
            const { newPassword } = request.body
            const { reset_token: resetToken } = request.params

            await AuthService.resetPassword({ resetToken, newPassword })
            
            return response.status(200).json({
                ok: true,
                status: 200,
                message: "Contraseña actualizada con éxito"
            })
        } catch(error) {
            next(error)
        }
    }
}

export default AuthController