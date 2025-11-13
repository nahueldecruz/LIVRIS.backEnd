import mysql from 'mysql2/promise'
import ENVIRONMENT from './environment.config.js'

const pool = mysql.createPool({
    host: ENVIRONMENT.MYSQL_HOST,
    user: ENVIRONMENT.MYSQL_USERNAME,
    password: ENVIRONMENT.MYSQL_PASSWORD,
    database: ENVIRONMENT.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection()
.then((connection) => {
    console.log("Conexión con la DB exitosa!")
}).catch((error) => {
    console.error("Error con la conexión con la DB: " + error.message)
})

export default pool