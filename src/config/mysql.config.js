import mysql from 'mysql2/promise'
import ENVIRONMENT from './environment.config.js'

const pool = mysql.createPool({
    host: ENVIRONMENT.MYSQL_HOST,
    user: ENVIRONMENT.MYSQL_USERNAME,
    password: ENVIRONMENT.MYSQL_PASSWORD,
    database: ENVIRONMENT.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

try {
    await pool.query("SELECT 1");
    console.log("Conexión con la DB exitosa!");
} catch (err) {
    console.error("Error con la conexión: " + err.message);
}


export default pool