import BooksService from "../services/books.service.js";
import { ServerError } from "../utils/customError.utils.js";

class BooksControllers {
    
    static async getAll(request, response, next) {
        try {
            const { page = 1, maxResults = 9 } = request.query
            
            const startIndex = (page - 1) * maxResults

            const booksFound = await BooksService.getAll({ startIndex, maxResults })

            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Libros obtenidas',
                data: {
                    books: booksFound
                },
            })
        } catch(error) {
            next(error)
        }
    }

    static async getByQuery(request, response, next) {
        try {
            const { q: query, page = 1, maxResults = 9 } = request.query
            const startIndex = (page - 1) * maxResults
            
            if (!query || !page || !maxResults) {
                return response.status(400).json({ ok: false, msg: "Falta un parámetro de búsqueda" })
            }
            
            const responseData = await BooksService.searchGoogleBooks({ query, startIndex, maxResults})
        
            if (!responseData.items) {
                return response.json({ 
                    ok: true, 
                    data: {
                        books: []
                    }
                })
            }

            const books = responseData.items.map((item) => {
                const info = item.volumeInfo
                return {
                    api_id: item.id,
                    title: info.title || "Sin título",
                    author_name: info.authors ? info.authors.join(", ") : "Desconocido",
                    description: info.description || "",
                    published_year: info.publishedDate ? parseInt(info.publishedDate) || null : null,
                    category: info.categories ? info.categories[0] : null,
                    cover_url: info.imageLinks ? info.imageLinks.thumbnail : null
                }
            })

            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Libros obtenidos',
                data: {
                    books
                },
            })
        } catch (error) {
            next(error)
        }
    }

    static async getById(request, response, next) {
        try {
            const { book_id: bookId } = request.params

            const bookFound = await BooksService.getById(bookId)

            if(!bookFound) {
                throw new ServerError(401, 'No se encontró al libro')
            }

            return response.status(200).json({ 
                ok: true,
                status: 200,
                message: 'Libro obtenido',
                data: {
                    book: bookFound
                },
            })
        } catch(error) {
            next(error)
        }
    }

    static async save(request, response, next) {
        try {
            const { book } = request.body

            if(!book) {
                throw new ServerError(404, 'No se recibió ningún libro')
            }

            const bookSaved = await BooksService.save(book)
            
            return response.status(201).json({
                ok: true,
                status: 200,
                message: 'Libro guardado en la base de datos',
                data: {
                    bookSaved
                }
            })
        } catch(error) {
            next(error)
        }
    }
}

export default BooksControllers