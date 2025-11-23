CREATE TABLE User_Books (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    status ENUM('want_to_read', 'reading', 'read') DEFAULT 'want_to_read',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(_id)
        ON UPDATE CASCADE ON DELETE CASCADE
)

ALTER TABLE User_Books
ADD UNIQUE KEY user_book_unique (user_id, book_id);