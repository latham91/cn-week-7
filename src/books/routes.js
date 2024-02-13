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

// Chained route handlers
router.route("/").get(getAllBooks).post(addNewBook).delete(deleteAllBooks).patch(updateAuthorByTitle);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/:title").patch(updateDetailsByTitle);

module.exports = router;
