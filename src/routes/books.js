const express = require("express");
const router = express.Router();
const {
    getAllBooks,
    addNewBook,
    getBookById,
    updateBook,
    deleteBook,
    deleteAllBooks,
    updateAuthorByTitle,
    updateDetailsByTitle,
} = require("../controllers/books");

router.route("/").get(getAllBooks).post(addNewBook).delete(deleteAllBooks).patch(updateAuthorByTitle);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/:title").patch(updateDetailsByTitle);

module.exports = router;
