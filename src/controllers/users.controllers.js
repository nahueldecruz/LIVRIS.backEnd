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
}

export default UsersController