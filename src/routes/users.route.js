import express from 'express'
import UsersController from "../controllers/users.controllers.js";
import joiValidationMiddleware from '../middlewares/joiValitation.middleware.js';
import paginationSchema from '../schemas/pagination.schema.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import UserBookControllers from '../controllers/userBook.controllers.js';

const usersRouter = express.Router()

usersRouter.use(authMiddleware)
usersRouter.get("/search", joiValidationMiddleware({ query: paginationSchema }), UsersController.searchUsers)
usersRouter.get("/:user_id/books/:status", UserBookControllers.getBooksByUserIdAndStatus)
usersRouter.get("/:user_id", UsersController.getById)

export default usersRouter