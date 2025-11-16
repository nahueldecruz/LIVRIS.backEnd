import BooksControllers from "../controllers/books.controllers.js";
import express from 'express'
import joiValidationMiddleware from "../middlewares/joiValitation.middleware.js";
import booksQuerySchema from "../schemas/booksQuery.schema.js";

const bookRouter = express.Router()

bookRouter.get("/", joiValidationMiddleware({ query: booksQuerySchema }),BooksControllers.getAll)
bookRouter.get("/search", BooksControllers.getByQuery)
bookRouter.get("/:book_id", BooksControllers.getById)
bookRouter.post("/save-book", BooksControllers.save)

export default bookRouter