import BooksControllers from "../controllers/books.controllers.js";
import express from 'express'

const bookRouter = express.Router()

bookRouter.get("/", BooksControllers.getAll)
bookRouter.get("/search", BooksControllers.getByQuery)
bookRouter.get("/:book_id", BooksControllers.getById)
bookRouter.post("/save-book", BooksControllers.save)

export default bookRouter