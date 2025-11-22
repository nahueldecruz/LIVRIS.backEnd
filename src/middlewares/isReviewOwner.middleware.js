import ReviewsService from "../services/reviews.service.js";

export const isReviewOwner = async (request, res, next) => {
    const { review_id: reviewId } = request.params
    const userId = request.user._id
    
    const review = await ReviewsService.getById(reviewId)

    if (!review) {
        return res.status(404).json({ message: "Reseña no encontrada" })
    }

    if (review.user_id !== userId) {
        return res.status(403).json({ message: "No autorizado" })
    }

    next()
}
