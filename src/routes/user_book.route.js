import express from 'express'
import UserBookControllers from '../controllers/userBook.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const userBookRouter = express.Router()

userBookRouter.use(authMiddleware)
userBookRouter.delete("/:user_book_id", UserBookControllers.deleteById)

export default userBookRouter