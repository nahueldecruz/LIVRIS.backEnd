import dotenv from 'dotenv'
dotenv.config()

const ENVIRONMENT = {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USERNAME: process.env.MYSQL_USERNAME,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    JWT_VERIFICATION_SECRET_KEY: process.env.JWT_VERIFICATION_SECRET_KEY,
    JWT_RESET_SECRET_KEY: process.env.JWT_RESET_SECRET_KEY,
    URL_API: process.env.URL_API,
    URL_FRONTEND: process.env.URL_FRONTEND,
    URL_API_GOOGLE_BOOKS: process.env.URL_API_GOOGLE_BOOKS,
    RESEND_API_KEY: process.env.RESEND_API_KEY
}

export default ENVIRONMENT