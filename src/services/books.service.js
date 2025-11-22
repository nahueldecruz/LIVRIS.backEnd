import ENVIRONMENT from "../config/environment.config.js"
import BookRepository from "../repositories/book.repository.js"

class BooksService {

    static async getAll({ startIndex, maxResults }) {
        const booksFound = await BookRepository.getAll({ startIndex, maxResults })

        return booksFound
    }
    
    static async searchGoogleBooks({ query, startIndex, maxResults }) {
        try {
            const responseHttp = await fetch(`${ENVIRONMENT.URL_API_GOOGLE_BOOKS}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`)

            const responseData = await responseHttp.json()
    
            if(!responseHttp.ok){
                throw responseData
            }
            return responseData

        } catch(error) {
            throw error
        }
    }

    static async getById(bookId) {
        const bookFound = await BookRepository.getById(bookId)

        return bookFound
    }

    static async save(book) {
        const bookSaved = await BookRepository.save(book)

        return bookSaved
    }
}

export default BooksService