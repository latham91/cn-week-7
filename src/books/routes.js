const router = require("express").Router();

const {
    getAllBooks,
    addNewBook,
    getBookById,
    updateBook,
    deleteBook,
    deleteAllBooks,
    updateAuthorByTitle,
    updateDetailsByTitle,
} = require("./controllers");

// Swagger Schema Definitions
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         description:
 *           type: string
 *           description: The description of the book.
 *         genre:
 *           type: string
 *           description: The genre of the book.
 *         createdAt:
 *           type: string
 *           description: The date the book was created.
 *         updatedAt:
 *           type: string
 *           description: The date the book was updated.
 *         __v:
 *          type: number
 *          description: The mongoose version key.
 *       example:
 *         _id: 5f4e4f1c5d2c12e6b4e9f8e1
 *         title: "Harry Potter and the Philosopher's Stone"
 *         author: "J.K. Rowling"
 *         description: "A young wizard fights evil"
 *         genre: "Fantasy"
 *         createdAt: "2020-09-01T21:40:28.451Z"
 *         updatedAt: "2020-09-01T21:40:28.451Z"
 *         __v: 0
 *
 *     ModifiedBook:
 *       allOf:
 *         - $ref: '#/components/schemas/Book'
 *         - type: object
 *           properties:
 *             author:
 *               type: string
 *               description: The new author of the book.
 *               example: "John Doe"
 *       example:
 *         _id: 5f4e4f1c5d2c12e6b4e9f8e1
 *         title: "Harry Potter and the Philosopher's Stone"
 *         author: "John Doe"
 *         description: "A young wizard fights evil"
 *         genre: "Fantasy"
 *         createdAt: "2020-09-01T21:40:28.451Z"
 *         updatedAt: "2020-09-01T21:40:28.451Z"
 *         __v: 0
 *
 *     UpdatedBook:
 *       allOf:
 *         - $ref: '#/components/schemas/Book'
 *         - type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "The Lord of the Rings"
 *             author:
 *               type: string
 *               example: "J.R.R. Tolkien"
 *             description:
 *               type: string
 *               example: "A hobbit goes on an adventure"
 *             genre:
 *               type: string
 *               example: "Fantasy"
 *       example:
 *         _id: 5f4e4f1c5d2c12e6b4e9f8e1
 *         title: "The Lord of the Rings"
 *         author: "J.R.R. Tolkien"
 *         description: "A hobbit goes on an adventure"
 *         genre: "Fantasy"
 *         createdAt: "2020-09-01T21:40:28.451Z"
 *         updatedAt: "2020-09-01T21:40:28.451Z"
 *         __v: 0
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: Cast to ObjectId failed for value
 */
router.get("/", getAllBooks);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *                 example: Harry Potter and the Philosopher's Stone
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *                 example: J.K. Rowling
 *               description:
 *                 type: string
 *                 description: The description of the book.
 *                 example: A young wizard fights evil
 *               genre:
 *                 type: string
 *                 description: The genre of the book.
 *                 example: Fantasy
 *
 *     responses:
 *       201:
 *         description: The book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No title given"
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: Cast to ObjectId failed for value
 */
router.post("/", addNewBook);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books
 * /books:
 *   delete:
 *     summary: Delete all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successfully deleted all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     properties:
 *                       success:
 *                         type: boolean
 *                         example: true
 *                       count:
 *                         type: number
 *                         example: 0
 *                       message:
 *                         type: string
 *                         example: All books deleted successfully
 *
 */
router.delete("/", deleteAllBooks);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books
 * /books:
 *   patch:
 *     summary: Update an author by book title
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - newAuthor
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *                 example: Harry Potter and the Philosopher's Stone
 *               newAuthor:
 *                 type: string
 *                 description: The new author of the book.
 *                 example: John Doe
 *
 *     responses:
 *       200:
 *         description: The books author was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ModifiedBook'
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No title given"
 *
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Book with title: Harry Potter and the Philosopher's Stone not found."
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: Cast to ObjectId failed for value
 */
router.patch("/", updateAuthorByTitle);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books
 * /books/{id}:
 *   get:
 *     summary: Get a book by its id
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to find book with id: 5f4e4f1c5d2c12e6b4e9f8e1"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: Cast to ObjectId failed for value
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by its id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: requestBody
 *         required: true
 *         description: The updated book details
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: The Lord of the Rings
 *             author:
 *               type: string
 *               example: J.R.R. Tolkien
 *             description:
 *               type: string
 *               example: A hobbit goes on an adventure
 *             genre:
 *               type: string
 *               example: Fantasy
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Book with id: 5f4e4f1c5d2c12e6b4e9f8e1 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put("/:id", updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by its id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Book with id: 5f4e4f1c5d2c12e6b4e9f8e1 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/:id", deleteBook);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books
 * /books/{title}:
 *   patch:
 *     summary: Update a books fields by book title
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - newAuthor
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the book.
 *                 example: Harry Potter and the Philosopher's Stone
 *               author:
 *                 type: string
 *                 description: The new author of the book.
 *                 example: John Doe
 *
 *     responses:
 *       200:
 *         description: The books details were updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ModifiedBook'
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No title given"
 *
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Book with title: Harry Potter and the Philosopher's Stone not found."
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *                 error:
 *                   type: string
 *                   example: Cast to ObjectId failed for value
 */
router.patch("/:title", updateDetailsByTitle);

module.exports = router;
