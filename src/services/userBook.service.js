import UserBookRepository from "../repositories/userBook.repository.js"

class UserBookService {
    static async setStatus({ bookId, status, userId }) {
        const statusUserBook = await UserBookRepository.setStatus({ bookId, status, userId })

        return statusUserBook
    }

    static async getByUserIdAndBookId({ bookId, userId }) {
        const statusUserBook = await UserBookRepository.getByUserIdAndBookId({ bookId, userId })

        return statusUserBook
    }

    static async getBooksByUserIdAndStatus({ status, userId }) {
        const statusFound = await UserBookRepository.getBooksByUserIdAndStatus({ userId, status })

        return statusFound
    }
}

export default UserBookService