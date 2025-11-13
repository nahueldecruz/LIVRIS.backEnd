import BookRepository from "../repositories/book.repository.js";
import ReviewRepository from "../repositories/review.repository.js";
import UserRepository from "../repositories/user.repository.js";
import { ServerError } from "../utils/customError.utils.js";

class ReviewsService {
    
    static async getById(reviewId) {
        const reviewFound = await ReviewRepository.getById(reviewId)
        
        return reviewFound
    } 
    
    static async getByBookId(bookId) {
        const reviewsFound = await ReviewRepository.getByBookId(bookId)
        
        return reviewsFound
    }
    
    static async getByUserId(userId) {
        const reviewsFound = await ReviewRepository.getByUserId(userId)
        
        return reviewsFound
    } 
    
    static async getByUserIdAndBookId({ userId, bookId }) {
        const reviewsFound = await ReviewRepository.getByUserIdAndBookId({ userId, bookId })
        
        return reviewsFound
    }

    static async create({ userId, bookId, content, rating }) {
        
        const user = await UserRepository.getById(userId)

        if(!user) {
            throw new ServerError(404, 'El usuario no existe')
        }
        
        const book = await BookRepository.getById(bookId)
        
        if(!book) {
            throw new ServerError(404, 'El libro no existe')
        }

        const reviewFound = await ReviewRepository.getByUserIdAndBookId({ userId, bookId })

        if(reviewFound) {
            throw new ServerError(400, 'Este usuario ya tiene una reseña de este libro')
        }

        const reviewCreated = await ReviewRepository.create({ userId, bookId, content, rating})

        return reviewCreated
    }
}

export default ReviewsService