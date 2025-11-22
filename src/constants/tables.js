export const USERS_TABLE = {
    NAME: 'Users',
    COLUMNS: {
        ID: '_id',
        NAME: 'name',
        EMAIL: 'email',
        VERIFIED_EMAIL: 'verified_email',
        PASSWORD: 'password',
        ROLE: 'role',
        IMAGE_URL: 'image_url',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at',
        IS_ACTIVE: 'is_active'
    }
}

export const CATEGORIES_TABLE = {
    NAME: 'Categories',
    COLUMNS: {
        ID: '_id',
        NAME: 'name',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at',
        IS_ACTIVE: 'is_active'
    }
}

export const COMMENTS_TABLE = {
    NAME: 'Comments',
    COLUMNS: {
        ID: '_id',
        FK_REVIEW_ID: 'review_id',
        FK_USER_ID: 'user_id',
        FK_PARENT_COMMENT_ID: 'parent_comment_id',
        CONTENT: 'content',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at',
        IS_ACTIVE: 'is_active'
    }
}

export const FRIENDSHIPS_TABLE = {
    NAME: 'Friendships',
    COLUMNS: {
        ID: '_id',
        FK_REQUESTER_ID: 'requester_id',
        FK_RECEIVER_ID: 'receiver_id',
        STATUS: 'status',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at',
        IS_ACTIVE: 'is_active'
    }
}

export const REVIEWS_TABLE = {
    NAME: 'Reviews',
    COLUMNS: {
        ID: '_id',
        FK_USER_ID: 'user_id',
        FK_BOOK_ID: 'book_id',
        RATING: 'rating',
        CONTENT: 'content',
        IS_EDITED: 'is_edited',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at',
        IS_ACTIVE: 'is_active'
    }
}

export const USER_BOOKS_TABLE = {
    NAME: 'User_Books',
    COLUMNS: {
        ID: '_id',
        FK_USER_ID: 'user_id',
        FK_BOOK_ID: 'book_id',
        STATUS: 'status',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at'
    }
}

export const BOOKS_TABLE = {
    NAME: 'Books',
    COLUMNS: {
        ID: '_id',
        TITLE: 'title',
        AUTHOR_NAME: 'author_name',
        DESCRIPTION: 'description',
        PUBLISHED_YEAR: 'published_year',
        CATEGORY: 'category',
        COVER_URL: 'cover_url',
        API_ID: 'api_id',
        CREATED_AT: 'created_at',
        UPDATED_AT: 'updated_at'
    }
}