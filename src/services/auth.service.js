import UserRepository from "../repositories/user.repository.js"
import { ServerError } from "../utils/customError.utils.js"
import bcrypt from 'bcrypt'
import transporter from '../config/mailer.config.js'
import jwt from 'jsonwebtoken'
import ENVIRONMENT from "../config/environment.config.js"

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

        await transporter.sendMail({
            from: ENVIRONMENT.GMAIL_USER,
            to: email,
            subject: 'Verificacion de usuario!!',
            html: `
            <h1>Hola ${name} desde Libris</h1>
            <span>Este es un email de verificacion.</span>
            <a href="${ENVIRONMENT.URL_API}/api/auth/verify-email/${verificationToken}">Verificar</a>
            `
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
                        expiresIn: '1d'
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
        await transporter.sendMail({
            from: ENVIRONMENT.GMAIL_USER,
            to: email,
            subject: 'Email de recuperación de contraseña!!',
            html: `
            <h1>Hola ${userFound.name} desde Libris</h1>
            <span>Has click en el link para cambiar la contraseña.</span>
            <a href="${ENVIRONMENT.URL_FRONTEND}/reset-password/${resetToken}">Verificar</a>
            `
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