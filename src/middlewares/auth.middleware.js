import ENVIRONMENT from "../config/environment.config.js"
import { ServerError } from "../utils/customError.utils.js"
import jwt from "jsonwebtoken"

function authMiddleware (request, response, next) {
    try {
        const authotizationHeader = request.headers.authorization
        if(!authotizationHeader) {
            throw new ServerError(400, 'No hay header de autorización')
        }
        
        const authotizationToken = authotizationHeader.split(' ').pop()
        if(!authotizationToken) {
            throw new ServerError(400, 'No hay token de autorización')
        }

        const userData = jwt.verify(authotizationToken, ENVIRONMENT.JWT_VERIFICATION_SECRET_KEY)
        request.user = userData
        next()
    } catch(error) {
        next(error)
    }
}

export default authMiddleware