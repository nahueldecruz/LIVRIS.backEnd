import pool from "../config/mysql.config.js";
import { BOOKS_TABLE, REVIEWS_TABLE, USERS_TABLE } from "../constants/tables.js";

const BOOK_USER_REVIEW_SELECT = `
    R.${REVIEWS_TABLE.COLUMNS.ID} AS review_id,
    R.${REVIEWS_TABLE.COLUMNS.CONTENT} AS review_content,
    R.${REVIEWS_TABLE.COLUMNS.RATING} AS review_rating,
    R.${REVIEWS_TABLE.COLUMNS.CREATED_AT} AS review_created_at,
    R.${REVIEWS_TABLE.COLUMNS.IS_EDITED} AS review_is_edited,

    R.${REVIEWS_TABLE.COLUMNS.FK_USER_ID} AS user_id,
    R.${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} AS book_id,

    U.${USERS_TABLE.COLUMNS.NAME} AS user_name,
    U.${USERS_TABLE.COLUMNS.IMAGE_URL} AS user_url_image,
    U.${USERS_TABLE.COLUMNS.EMAIL} AS user_email,

    B.${BOOKS_TABLE.COLUMNS.TITLE} AS book_title,
    B.${BOOKS_TABLE.COLUMNS.AUTHOR_NAME} AS book_author
`

class ReviewRepository {
    
    static async getById(reviewId) {
        const query = `
            SELECT * FROM ${REVIEWS_TABLE.NAME} 
            WHERE ${REVIEWS_TABLE.COLUMNS.ID} = ?
            AND ${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = 1
        `
        
        const [result] = await pool.execute(query, [ reviewId ])
        
        const review = result[0]
        
        return review || null
    }

    static async getByBookId(bookId) {
        const query = `
            SELECT 
                ${BOOK_USER_REVIEW_SELECT}
            FROM ${REVIEWS_TABLE.NAME} R
            JOIN ${USERS_TABLE.NAME} U
                ON R.${REVIEWS_TABLE.COLUMNS.FK_USER_ID} = U.${USERS_TABLE.COLUMNS.ID}
            JOIN ${BOOKS_TABLE.NAME} B
                ON R.${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} = B.${BOOKS_TABLE.COLUMNS.ID}
            WHERE R.${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} = ?
            AND R.${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = 1
            ORDER BY R.${REVIEWS_TABLE.COLUMNS.CREATED_AT} DESC
        `
        
        const [ reviews ] = await pool.execute(query, [ bookId ])
        
        return reviews
    }
    
    static async getByUserId(userId) {
        const query = `
            SELECT 
                ${BOOK_USER_REVIEW_SELECT}
            FROM ${REVIEWS_TABLE.NAME} R
            JOIN ${USERS_TABLE.NAME} U
                ON R.${REVIEWS_TABLE.COLUMNS.FK_USER_ID} = U.${USERS_TABLE.COLUMNS.ID}
            JOIN ${BOOKS_TABLE.NAME} B
                ON R.${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} = B.${BOOKS_TABLE.COLUMNS.ID}
            WHERE R.${REVIEWS_TABLE.COLUMNS.FK_USER_ID} = ?
            AND R.${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = 1
            ORDER BY R.${REVIEWS_TABLE.COLUMNS.CREATED_AT} DESC
        `
        
        const [ reviews ] = await pool.execute(query, [ userId ])
        
        return reviews
    }

    static async getByUserIdAndBookId({ userId, bookId }) {
        const query = `
            SELECT * FROM ${REVIEWS_TABLE.NAME} 
            WHERE ${REVIEWS_TABLE.COLUMNS.FK_USER_ID} = ?
            AND ${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} = ?
            AND ${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = 1
        `
        
        const [ result ] = await pool.execute(query, [ userId, bookId ])
        
        const review = result[0]

        return review || null
    }

    static async create({ userId, bookId, rating, content }) {

        const query = `
            INSERT INTO ${REVIEWS_TABLE.NAME} (
                ${REVIEWS_TABLE.COLUMNS.FK_USER_ID},
                ${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID},
                ${REVIEWS_TABLE.COLUMNS.RATING},
                ${REVIEWS_TABLE.COLUMNS.CONTENT}
            )
            VALUES (?, ?, ?, ?);
        `
    
        const [ result ] = await pool.execute(query, [ userId, bookId, rating, content ])
    
        const reviewCreated = await ReviewRepository.getById(result.insertId)
    
        return reviewCreated
    }

    static async updateById({ reviewId, newValues }) {
        const fields = Object.keys(newValues)
        const values = Object.values(newValues)

        if (fields.length === 0){
            return null
        }

        const fieldsString = fields.map(field => `${field} = ?`).join(', ')

        const query = `
            UPDATE ${REVIEWS_TABLE.NAME} 
            SET ${fieldsString}, is_edited = TRUE
            WHERE ${REVIEWS_TABLE.COLUMNS.ID} = ?
            AND ${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = 1
        `

        const [result] = await pool.execute(query, [...values, reviewId])

        if (result.affectedRows === 0){
            return null
        }
        
        const reviewUpdated = await ReviewRepository.getById(reviewId)
        return reviewUpdated
    }

    static async softDeleteById(reviewId) {
        const query = `
            UPDATE ${REVIEWS_TABLE.NAME} 
            SET ${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = FALSE
            WHERE ${REVIEWS_TABLE.COLUMNS.ID} = ?
            AND ${REVIEWS_TABLE.COLUMNS.IS_ACTIVE} = TRUE
        `

        const [result] = await pool.execute(query, [reviewId])

        if (result.affectedRows === 0){
            return null
        }

        return true
    }
}

export default ReviewRepository