import ReviewsService from "../services/reviews.service.js"
import { ServerError } from "../utils/customError.utils.js"

class ReviewsControllers {

    static async getById(request, response, next) {
        try {
            const { review_id: reviewId } = request.params
            
            const reviewFound = await ReviewsService.getById(reviewId)

            if(!reviewFound) {
                throw new ServerError(404, 'No se encontró reseña')
            }
            
            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Reseña obtenida',
                data: {
                    review: reviewFound
                },
            })
        } catch(error) {
            next(error)
        }
    }

    static async getByBookId(request, response, next) {
        try {
            const { book_id: bookId } = request.params
            
            const reviewsFound = await ReviewsService.getByBookId(bookId)
            
            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Reseñas de libro obtenidas',
                data: {
                    reviews: reviewsFound
                },
            })
        } catch(error) {
            next(error)
        }
    }

    static async getByUserId(request, response, next) {
        try {
            const { user_id: userId } = request.params
            
            const reviewsFound = await ReviewsService.getByUserId(userId)
            
            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Reseñas de usuario obtenidas',
                data: {
                    reviews: reviewsFound
                },
            })
        } catch(error) {
            next(error)
        }
    }

    static async getByUserIdAndBookId(request, response, next){
        try {
            const { user_id: userId, book_id: bookId } = request.params
            
            const reviewFound = await ReviewsService.getByUserIdAndBookId({ userId, bookId })
            
            if(!reviewFound) {
                return response.status(200).json({
                    ok: false,
                    status: 200,
                    errorType: "NOT_FOUND",
                    message: 'No se encontró reseña'
                })
            }

            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Reseña del usuario al libro',
                data: {
                    review: reviewFound
                },
            })
        } catch(error) {
            next(error)
        }
    }

    static async create(request, response, next) {
        try {
            const { user_id: userId, book_id: bookId, rating, content } = request.body
            
            const reviewCreate = await ReviewsService.create({ userId, bookId, rating, content })

            if(!reviewCreate) {
                throw new ServerError(400, 'No se pudo crear la reseña')
            }

            return response.status(201).json({
                ok: true,
                status: 200,
                message: 'Reseña creada con éxito',
                data: {
                    review: reviewCreate
                },
            })
        } catch(error) {
            next(error)
        }
    }
}

export default ReviewsControllers