import pool from "../config/mysql.config.js";
import { BOOKS_TABLE, USER_BOOKS_TABLE } from "../constants/tables.js";

class UserBookRepository {
    
    static async getById(statusId) {
        const query = `
            SELECT * FROM ${USER_BOOKS_TABLE.NAME} 
            WHERE ${USER_BOOKS_TABLE.COLUMNS.ID} = ?
        `

        const [ result ] = await pool.execute(query, [ statusId ])
        
        const status = result[0]

        return status || null
    }

    static async getByUserIdAndBookId({ bookId, userId }) {
        const query = `
            SELECT * FROM ${USER_BOOKS_TABLE.NAME} 
            WHERE ${USER_BOOKS_TABLE.COLUMNS.FK_USER_ID} = ?
            AND ${USER_BOOKS_TABLE.COLUMNS.FK_BOOK_ID} = ?
        `

        const [ result ] = await pool.execute(query, [ userId, bookId ])
        
        const status = result[0]

        return status || null
    }

    static async getBooksByUserIdAndStatus({ status, userId }) {
        const query = `
            SELECT 
                B.${BOOKS_TABLE.COLUMNS.ID} AS book_id,
                B.${BOOKS_TABLE.COLUMNS.TITLE},
                B.${BOOKS_TABLE.COLUMNS.AUTHOR_NAME},
                B.${BOOKS_TABLE.COLUMNS.PUBLISHED_YEAR},
                B.${BOOKS_TABLE.COLUMNS.CATEGORY},
                B.${BOOKS_TABLE.COLUMNS.COVER_URL},
                UB.${USER_BOOKS_TABLE.COLUMNS.STATUS},
                UB.${USER_BOOKS_TABLE.COLUMNS.ID} AS user_book_id
            FROM ${USER_BOOKS_TABLE.NAME} UB
            INNER JOIN ${BOOKS_TABLE.NAME} B
                ON UB.${USER_BOOKS_TABLE.COLUMNS.FK_BOOK_ID} = B.${BOOKS_TABLE.COLUMNS.ID}
            WHERE UB.${USER_BOOKS_TABLE.COLUMNS.FK_USER_ID} = ?
            AND UB.${USER_BOOKS_TABLE.COLUMNS.STATUS} = ?
        `

        const [ booksFound ] = await pool.execute(query, [ userId, status ])

        return booksFound
    }
    
    static async create({ status, bookId, userId }) {
        const query = `
            INSERT INTO ${USER_BOOKS_TABLE.NAME} (
                ${USER_BOOKS_TABLE.COLUMNS.STATUS}, 
                ${USER_BOOKS_TABLE.COLUMNS.FK_BOOK_ID}, 
                ${USER_BOOKS_TABLE.COLUMNS.FK_USER_ID}
            )
            VALUES (?, ?, ?)
        `
        
        const [result] = await pool.query(query, [status, bookId, userId]);

        const statusCreated = await UserBookRepository.getById(result.insertId)

        return statusCreated
    }

    static async setStatus({ bookId, status, userId }) {
        const existing = await UserBookRepository.getByUserIdAndBookId({ userId, bookId })

        if (!existing) {
            const statusCreated = await UserBookRepository.create({ bookId, status, userId })
            return statusCreated
        }
        
        const query = `
            UPDATE ${USER_BOOKS_TABLE.NAME}
            SET ${USER_BOOKS_TABLE.COLUMNS.STATUS} = ?
            WHERE ${USER_BOOKS_TABLE.COLUMNS.FK_USER_ID} = ? 
            AND ${USER_BOOKS_TABLE.COLUMNS.FK_BOOK_ID} = ?
        `

        const [ result ] = await pool.execute(query, [ status, userId, bookId ])

        if (result.affectedRows === 0){
            return null
        }

        const statusUserBook = await UserBookRepository.getByUserIdAndBookId({ userId, bookId })

        return statusUserBook
    }

    static async deleteById(userBookId) {
        const query = `
            DELETE FROM ${USER_BOOKS_TABLE.NAME}
            WHERE ${USER_BOOKS_TABLE.COLUMNS.ID} = ?
        `

        const [result] = await pool.execute(query, [userBookId])

        if (result.affectedRows === 0){
            return null
        }

        return true
    }
}

export default UserBookRepository