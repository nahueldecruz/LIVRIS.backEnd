import UsersService from "../services/users.service.js"

class UsersController {
    static async getById(request, response, next) {
        try {
            const { user_id: userId } = request.params

            const userFound = await UsersService.getById(userId)

            if(!userFound) {
                throw new ServerError(404, 'No se encontró al usuario')
            }

            response.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuario obtenido',
                data: {
                    user: userFound
                }
            })

        } catch(error) {
            next(error)
        }
    }

    static async searchUsers(request, response, next) {
        try {
            const { search, page = 1, maxResults = 12 } = request.query
            const startIndex = (page - 1) * maxResults
            
            if (!search || !page || !maxResults) {
                return response.status(400).json({ ok: false, message: "Falta un parámetro de búsqueda" })
            }

            const usersFound = await UsersService.searchUsers({ search, maxResults, startIndex })

            response.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuarios obtenidos',
                data: {
                    users: usersFound
                }
            })

        } catch(error) {
            next(error)
        }
    }
}

export default UsersController