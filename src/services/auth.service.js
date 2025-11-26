import UserRepository from "../repositories/user.repository.js"
import { ServerError } from "../utils/customError.utils.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENVIRONMENT from "../config/environment.config.js"
import transporter from '../config/email/mailer.config.js'
import getForgotPassword from "../config/email/forgotPassword.html.js"
import getVerifyEmailHTML from "../config/email/verifyEmail.html.js"

class AuthService {
    static async register ({ name, password, email }){
        const userFound = await UserRepository.getByEmail(email)

        if(userFound){
            throw new ServerError(400, 'Email ya registrado')
        }

        const passwordHashed = await bcrypt.hash(password, 12)

        const userCreated = await UserRepository.create({ name, password: passwordHashed, email })

        const verificationToken = jwt.sign({
                email: email,
                id: userCreated._id,
                role: userCreated.role
            },
            ENVIRONMENT.JWT_VERIFICATION_SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

        const route = `${ENVIRONMENT.URL_API}/api/auth/verify-email/${verificationToken}`

        await transporter.sendMail({
            from: `"LiVris" <${ENVIRONMENT.GMAIL_USER}>`,
            to: email,
            subject: "Verificación de usuario",
            html: getVerifyEmailHTML(name, route)
        })
    }

    static async verifyEmail(verificationToken){
        const payload = jwt.verify(verificationToken, ENVIRONMENT.JWT_VERIFICATION_SECRET_KEY)

        await UserRepository.updateById(payload.id, {
            verified_email: true
        })
        return
    }

    static async login({ email, password }) {
        const userFound = await UserRepository.getByEmail(email)

        if(!userFound){
            throw new ServerError(404, 'Email no registrado')
        } else if(!userFound.verified_email) {
            throw new ServerError(401, 'Email no verificado')
        } else {
            const isValid = await bcrypt.compare(password, userFound.password)
            if(!isValid) {
                throw new ServerError(400, 'Contraseña invalida')
            } else {
                const authorizationToken = jwt.sign({
                        "_id": userFound._id,
                        name: userFound.name,
                        email: userFound.email,
                        createdAt: userFound.created_at
                    },
                    ENVIRONMENT.JWT_VERIFICATION_SECRET_KEY,
                    {
                        expiresIn: '7d'
                    }
                )

                const user = {
                    _id: userFound._id,
                    name: userFound.name,
                    email: userFound.email,
                    role: userFound.role, 
                    image_url: userFound.image_url, 
                    created_at: userFound.created_at
                }

                return {
                    authorizationToken,
                    user
                }
            }
        }
    }

    static async forgotPassword(email) {
        const userFound = await UserRepository.getByEmail(email)

        if(!userFound){
            throw new ServerError(404, 'Email no registrado')
        }

        const resetToken = jwt.sign({
                email: email,
                userId: userFound._id
            },
            ENVIRONMENT.JWT_RESET_SECRET_KEY,
            {
                expiresIn: '15m'
            }
        )

        const route = `${ENVIRONMENT.URL_FRONTEND}/reset-password/${resetToken}`

        await transporter.sendMail({
            from: `"LiVris" <${ENVIRONMENT.GMAIL_USER}>`,
            to: email,
            subject: "Verificación de usuario",
            html: getForgotPassword(userFound.name, route)
        })
    }

    static async resetPassword({ resetToken, newPassword }){
        const payload = jwt.verify(resetToken, ENVIRONMENT.JWT_RESET_SECRET_KEY)
        const newPasswordHashed = await bcrypt.hash(newPassword, 12)
        
        await UserRepository.updateById(payload.userId, {
            password: newPasswordHashed
        })
        return
    }
}

export default AuthService