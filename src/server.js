import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware.js'
import bookRouter from './routes/books.route.js'
import reviewRouter from './routes/reviews.route.js'
import usersRouter from './routes/users.route.js'

const app = express()
const PORT = 8080

app.use(express.json())

app.use(cors())


app.use('/api/auth', authRouter)

app.use('/api/books', bookRouter)

app.use('/api/reviews', reviewRouter)

app.use('/api/users', usersRouter)

app.get('/api/ping', (request, response) => { 
    return response.status(200).json({
        ok: true,
        status: 200,
        message: "pong"
    })
})

app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
    console.log(`Conexión con el Servidor éxitosa. Puerto: ${PORT}`)
})