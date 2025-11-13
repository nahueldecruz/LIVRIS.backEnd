import express from 'express'
import AuthController from '../controllers/auth.controllers.js'
import joiValidationMiddleware from '../middlewares/joiValitation.middleware.js'
import registerSchema from '../schemas/register.schema.js'
import loginSchema from '../schemas/login.schema.js'
import forgotPasswordSchema from '../schemas/forgotPassword.schema.js'
import resetPasswordSchema from '../schemas/resetPassword.chema.js'

const authRouter = express.Router()

authRouter.post('/register', joiValidationMiddleware({ body: registerSchema }), AuthController.register)

authRouter.post('/login', joiValidationMiddleware({ body: loginSchema }), AuthController.login)

authRouter.get('/verify-email/:verification_token', AuthController.verifyEmail)

authRouter.post('/forgot-password', joiValidationMiddleware({ body: forgotPasswordSchema }), AuthController.forgotPassword)

authRouter.put('/reset-password/:reset_token', joiValidationMiddleware({ body: resetPasswordSchema }), AuthController.resetPassword)

export default authRouter