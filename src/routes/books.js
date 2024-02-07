const express = require("express");
const router = express.Router();
const {
    getAllBooks,
    addNewBook,
    getBookById,
    updateBook,
    deleteBook,
    deleteAllBooks,
} = require("../controllers/books");

router.route("/").get(getAllBooks).post(addNewBook).delete(deleteAllBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
