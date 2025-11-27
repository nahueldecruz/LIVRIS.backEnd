import UserBookService from "../services/userBook.service.js"

class UserBookControllers {

    static async setStatus(request, response, next) {
        try {
            const { book_id: bookId } = request.params
            const { status } = request.body
            const userId = request.user._id

            const statusUserBook = await UserBookService.setStatus({ bookId, status, userId })

            return response.status(200).json({
                ok: true,
                status: 200,
                message: 'Libro guardado en lista de usuario',
                data: {
                    status: statusUserBook
                }
            })
        } catch(error) {
            next(error)
        }
    }

    static async getByUserIdAndBookId(request, response, next) {
        try {
            const { book_id: bookId } = request.params
            const userId = request.user._id

            const statusUserBook = await UserBookService.getByUserIdAndBookId({ bookId, userId })

            return response.status(200).json({
                ok: true,
                status: 200,
                message: 'Estado de libro obtenido',
                data: {
                    status: statusUserBook
                }
            })
        } catch(error) {
            next(error)
        }
    }

    static async getBooksByUserIdAndStatus(request, response, next) {
        try {

            const { user_id: userId, status } = request.params
            
            const booksByStatus = await UserBookService.getBooksByUserIdAndStatus({ status, userId })

            return response.status(200).json({
                ok: true,
                status: 200,
                message: `Lista de libros con estado "${status}"`,
                data: {
                    books: booksByStatus
                }
            })
        } catch(error) {
            next(error)
        }
    }

    static async deleteById(request, response, next) {
        try {
            const { user_book_id: userBookId } = request.params
            
            const isUserBookDeleted = await UserBookService.deleteById(userBookId)

            if(!isUserBookDeleted) {
                throw new ServerError(400, 'No se pudo eliminar el libro de la lista')
            }

            return response.status(200).json({
                ok: true,
                status: 200,
                message: 'Libro eliminado de la lista'
            })
        } catch(error) {
            next(error)
        }
    }
}

export default UserBookControllers