import { response } from "express";
import pool from "../config/mysql.config.js";
import { BOOKS_TABLE, REVIEWS_TABLE } from "../constants/tables.js";

class BookRepository {

    static async getAll({ startIndex, maxResults }) {
        console.log(typeof(startIndex))
        console.log(typeof(maxResults))
        console.log(startIndex, maxResults)
        const query = `
            SELECT
                B.*,
                (SELECT COUNT(*) FROM Reviews R WHERE R.book_id = B._id) AS reviewsCount,
                (SELECT ROUND(AVG(R.rating), 1) FROM Reviews R WHERE R.book_id = B._id) AS ratingAverage
            FROM Books B
            ORDER BY B.created_at ASC
            LIMIT ? OFFSET ?;
        `

        const [ books ] = await pool.execute(query, [maxResults, startIndex])

        return books
    }

    static async create({ title, author_name: authorName, description, published_year: publishedYear, category, cover_url: coverUrl, api_id: apiId }) {
        const query = `
            INSERT INTO ${BOOKS_TABLE.NAME} (
                ${BOOKS_TABLE.COLUMNS.TITLE},
                ${BOOKS_TABLE.COLUMNS.AUTHOR_NAME},
                ${BOOKS_TABLE.COLUMNS.DESCRIPTION},
                ${BOOKS_TABLE.COLUMNS.PUBLISHED_YEAR},
                ${BOOKS_TABLE.COLUMNS.CATEGORY},
                ${BOOKS_TABLE.COLUMNS.COVER_URL},
                ${BOOKS_TABLE.COLUMNS.API_ID}
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        const [result] = await pool.execute(query, [title, authorName, description, publishedYear, category, coverUrl, apiId])

        const bookCreated = await BookRepository.getById(result.insertId)

        return bookCreated
    }

    static async getById(bookId) {
        const query = `
            SELECT 
                B.*,
                COALESCE(COUNT(R.${REVIEWS_TABLE.COLUMNS.ID}), 0) AS reviewsCount,
                COALESCE(ROUND(AVG(R.${REVIEWS_TABLE.COLUMNS.RATING}), 1), 0) AS ratingAverage
            FROM ${BOOKS_TABLE.NAME} B
            LEFT JOIN ${REVIEWS_TABLE.NAME} R 
                ON R.${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} = B.${BOOKS_TABLE.COLUMNS.ID}
            WHERE B.${BOOKS_TABLE.COLUMNS.ID} = ?
            GROUP BY B.${BOOKS_TABLE.COLUMNS.ID};
        `

        const [result] = await pool.execute(query, [bookId])
        const bookFound = result[0]

        return bookFound || null
    }

    static async getByApiId(bookApiId) {
        const query = `
            SELECT
                B.*,
                COALESCE(COUNT(R.${REVIEWS_TABLE.COLUMNS.ID}), 0) AS reviewsCount,
                COALESCE(ROUND(AVG(R.${REVIEWS_TABLE.COLUMNS.RATING}), 1), 0) AS ratingAverage
            FROM ${BOOKS_TABLE.NAME} B
            LEFT JOIN ${REVIEWS_TABLE.NAME} R 
                ON R.${REVIEWS_TABLE.COLUMNS.FK_BOOK_ID} = B.${BOOKS_TABLE.COLUMNS.ID}
            WHERE B.${BOOKS_TABLE.COLUMNS.API_ID} = ?
            GROUP BY B.${BOOKS_TABLE.COLUMNS.ID};
        `

        const [result] = await pool.execute(query, [bookApiId])
        
        const bookFound = result[0]

        return bookFound || null
    }

    static async save(book) {
        const bookFound = await BookRepository.getByApiId(book.api_id)
        if (bookFound){
            return bookFound
        }

        const bookCreated = await BookRepository.create(book)

        return bookCreated
    }
}

export default BookRepository