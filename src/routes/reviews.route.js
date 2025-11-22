import ReviewsControllers from "../controllers/reviews.controllers.js";
import express from 'express'
import newReviewSchema from "../schemas/newReview.schema.js";
import joiValidationMiddleware from '../middlewares/joiValitation.middleware.js'
import authMiddleware from "../middlewares/auth.middleware.js";
import { isReviewOwner } from "../middlewares/isReviewOwner.middleware.js";

const reviewRouter = express.Router()

reviewRouter.get("/:review_id", ReviewsControllers.getById)
reviewRouter.get("/book/:book_id", ReviewsControllers.getByBookId)
reviewRouter.get("/user/:user_id", ReviewsControllers.getByUserId)
reviewRouter.get("/:user_id/:book_id", ReviewsControllers.getByUserIdAndBookId)
reviewRouter.post("/new-review", joiValidationMiddleware({ body: newReviewSchema }), ReviewsControllers.create)
reviewRouter.put("/reviews/:review_id", authMiddleware, isReviewOwner, ReviewsControllers.updateById)
reviewRouter.delete("/reviews/:review_id", authMiddleware, isReviewOwner, ReviewsControllers.softDeleteById)

export default reviewRouter