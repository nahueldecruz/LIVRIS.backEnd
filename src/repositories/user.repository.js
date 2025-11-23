import pool from "../config/mysql.config.js"
import { COMMENTS_TABLE, REVIEWS_TABLE, USERS_TABLE } from '../constants/tables.js'

class UserRepository {
    static async getById(userId) {
        const query = `
            SELECT
                U.*, 
                COUNT(DISTINCT R.${REVIEWS_TABLE.COLUMNS.ID}) AS reviews_count,
                COUNT(DISTINCT C.${COMMENTS_TABLE.COLUMNS.ID}) AS comments_count
            FROM ${USERS_TABLE.NAME} AS U
            LEFT JOIN ${REVIEWS_TABLE.NAME} AS R 
                ON R.${REVIEWS_TABLE.COLUMNS.FK_USER_ID} = U.${USERS_TABLE.COLUMNS.ID}
                AND R.${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = TRUE
            LEFT JOIN ${COMMENTS_TABLE.NAME} AS C 
                ON C.${COMMENTS_TABLE.COLUMNS.FK_USER_ID} = U.${USERS_TABLE.COLUMNS.ID}
                AND C.${COMMENTS_TABLE.COLUMNS.IS_ACTIVE} = TRUE
            WHERE U.${USERS_TABLE.COLUMNS.ID} = ?
            AND U.${USERS_TABLE.COLUMNS.IS_ACTIVE} = 1
            GROUP BY U.${USERS_TABLE.COLUMNS.ID}
        `

        const [result] = await pool.execute(query, [userId])
        const userFound = result[0]
        return userFound || null
    }

    static async getByEmail(userEmail) {
        const query = `
            SELECT
                U.*, 
                COUNT(DISTINCT R.${REVIEWS_TABLE.COLUMNS.ID}) AS reviews_count,
                COUNT(DISTINCT C.${COMMENTS_TABLE.COLUMNS.ID}) AS comments_count
            FROM ${USERS_TABLE.NAME} AS U
            LEFT JOIN ${REVIEWS_TABLE.NAME} AS R 
                ON R.${REVIEWS_TABLE.COLUMNS.FK_USER_ID} = U.${USERS_TABLE.COLUMNS.ID}
                AND R.${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = TRUE
            LEFT JOIN ${COMMENTS_TABLE.NAME} AS C 
                ON C.${COMMENTS_TABLE.COLUMNS.FK_USER_ID} = U.${USERS_TABLE.COLUMNS.ID}
                AND C.${COMMENTS_TABLE.COLUMNS.IS_ACTIVE} = TRUE
            WHERE U.${USERS_TABLE.COLUMNS.EMAIL} = ?
            AND U.${USERS_TABLE.COLUMNS.IS_ACTIVE} = 1
            GROUP BY U.${USERS_TABLE.COLUMNS.ID}
        `

        const [result] = await pool.execute(query, [userEmail])
        const userFound = result[0]
        return userFound || null
    }

    static async searchUsers({ search, maxResults, startIndex }) {
        const like = `%${search}%`

        const query = `
            SELECT 
                ${USERS_TABLE.COLUMNS.ID},
                ${USERS_TABLE.COLUMNS.NAME},
                ${USERS_TABLE.COLUMNS.EMAIL},
                ${USERS_TABLE.COLUMNS.CREATED_AT}
            FROM ${USERS_TABLE.NAME}
            WHERE 
                (${USERS_TABLE.COLUMNS.NAME} LIKE ? OR ${USERS_TABLE.COLUMNS.EMAIL} LIKE ?)
                AND ${USERS_TABLE.COLUMNS.IS_ACTIVE} = TRUE
            ORDER BY ${USERS_TABLE.COLUMNS.NAME} ASC
            LIMIT ${maxResults} OFFSET ${startIndex};
        `

        const [ users ] = await pool.execute(query, [like, like])
        return users
    }

    static async create({ name, email, password }){
        const query = `
            INSERT INTO ${USERS_TABLE.NAME}(
                ${USERS_TABLE.COLUMNS.EMAIL}, 
                ${USERS_TABLE.COLUMNS.NAME}, 
                ${USERS_TABLE.COLUMNS.PASSWORD}
            ) VALUES(?, ?, ?)
        `

        const [result] = await pool.execute(query, [email, name, password])

        const userCreated = await UserRepository.getById(result.insertId)

        return userCreated
    } 

    static async updateById(userId, newValues) {
        const fields = Object.keys(newValues)
        const values = Object.values(newValues)

        if (fields.length === 0){
            return null
        }

        const fieldsString = fields.map(field => `${field} = ?`).join(', ')

        const query = `
            UPDATE ${USERS_TABLE.NAME} 
            SET ${fieldsString} 
            WHERE ${USERS_TABLE.COLUMNS.ID} = ?
            AND ${USERS_TABLE.COLUMNS.IS_ACTIVE} = 1
        `

        const [result] = await pool.execute(query, [...values, userId])

        if (result.affectedRows === 0){
             return null
        }
        
        const userUpdated = await UserRepository.getById(userId)
        return userUpdated
    }
}

export default UserRepository