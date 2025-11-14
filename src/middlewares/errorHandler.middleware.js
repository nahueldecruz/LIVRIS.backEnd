import jwt from "jsonwebtoken"

function errorHandlerMiddleware(error, request, response, next){
    console.error(error)

    if(error instanceof jwt.TokenExpiredError){
        return response.status(401).json({
            ok: false,
            status: 401,
            message: 'Token expirado'
        })
    }

    if(error instanceof jwt.JsonWebTokenError){
        return response.status(401).json({
            ok: false,
            status: 401,
            message: 'Token invalido'
        })
    }
    
    if(error.status) {
        return response.status(error.status).json({
            ok: false,
            status: error.status,
            message: error.message,
            errors: error.errors || null
        })
    }

    return response.status(500).json({
        ok: false,
        status: 500,
        message: 'Error interno del servidor',
        error: error,
        errors: error.errors || null
    })
}

export default errorHandlerMiddleware