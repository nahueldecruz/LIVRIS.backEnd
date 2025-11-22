import ReviewsControllers from "../controllers/reviews.controllers.js"
import express from 'express'
import { newReviewSchema, updateReviewSchema } from "../schemas/review.schema.js"
import joiValidationMiddleware from '../middlewares/joiValitation.middleware.js'
import authMiddleware from "../middlewares/auth.middleware.js"
import { isReviewOwner } from "../middlewares/isReviewOwner.middleware.js"

const reviewRouter = express.Router()

reviewRouter.use(authMiddleware)
reviewRouter.get("/:review_id", ReviewsControllers.getById)
reviewRouter.get("/book/:book_id", ReviewsControllers.getByBookId)
reviewRouter.get("/user/:user_id", ReviewsControllers.getByUserId)
reviewRouter.get("/:user_id/:book_id", ReviewsControllers.getByUserIdAndBookId)
reviewRouter.post("/new-review", joiValidationMiddleware({ body: newReviewSchema }), ReviewsControllers.create)
reviewRouter.put("/:review_id", joiValidationMiddleware({ body: updateReviewSchema }), isReviewOwner, ReviewsControllers.updateById)
reviewRouter.delete("/:review_id", isReviewOwner, ReviewsControllers.softDeleteById)

export default reviewRouter