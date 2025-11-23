import BooksControllers from "../controllers/books.controllers.js";
import express from 'express'
import joiValidationMiddleware from "../middlewares/joiValitation.middleware.js";
import paginationSchema from "../schemas/pagination.schema.js";
import authMiddleware from '../middlewares/auth.middleware.js'
import UserBookControllers from "../controllers/userBook.controllers.js";
import statusUserBookSchema from "../schemas/statusUserBook.schema.js";

const bookRouter = express.Router()
bookRouter.use(authMiddleware)
bookRouter.get("/", joiValidationMiddleware({ query: paginationSchema }), BooksControllers.getAll)
bookRouter.get("/search", BooksControllers.getByQuery)
bookRouter.get("/:book_id", BooksControllers.getById)
bookRouter.get("/:book_id/status", UserBookControllers.getByUserIdAndBookId)
bookRouter.post("/save-book", BooksControllers.save)
bookRouter.patch("/:book_id/status", joiValidationMiddleware({ body: statusUserBookSchema }), UserBookControllers.setStatus)

export default bookRouter