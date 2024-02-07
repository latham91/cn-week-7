const Books = require("../models/books");

// GET ALL BOOKS
// GET /books
// Public Access
exports.getAllBooks = async (req, res) => {
    if (!req.query.genre) {
        // Checks for the genere query parameter
        try {
            const books = await Books.find();

            if (!books || books.length === 0) {
                return res.status(404).json({ success: true, message: "No books found" });
            }

            return res.status(200).json({ success: true, count: books.length, data: books });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    try {
        const books = await Books.find({ genre: req.query.genre });

        if (!books || books.length === 0) {
            return res.status(404).json({ success: true, message: "No books found" });
        }

        return res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// GET A BOOK BY ID
// GET /books/:id
// Public Access
exports.getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.findById(id);

        if (!book) {
            return res.status(404).json({ success: true, message: `Book with id: ${id} not found.` });
        }

        return res.status(200).json({ success: true, data: book });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ADD A NEW BOOK
// POST /books
// Private Access TODO: Add as protect route
exports.addNewBook = async (req, res) => {
    const { title, author, description, genre } = req.body;

    try {
        if (!title || !author || !description || !genre) {
            return res.status(400).json({ success: false, message: "Please add all the fields" });
        }

        const newBook = await Books.create(req.body);

        return res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// UPDATE A BOOK
// PUT /books/:id
// Private Access TODO: Add as protect route
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, genre } = req.body;

    try {
        const book = await Books.findById(id);

        if (!book) {
            return res.status(404).json({ success: true, message: `Book with id: ${id} not found.` });
        }

        if (!title || !author || !description || !genre) {
            return res.status(400).json({ success: false, message: "Please add all the fields" });
        }

        const updatedBook = await Books.findByIdAndUpdate(id, req.body, { new: true }); // new: true returns the updated document

        return res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// DELETE A BOOK
// DELETE /books/:id
// Private Access TODO: Add as protect route
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ success: true, message: `Book with id: ${id} not found.` });
        }

        return res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// DELETE ALL BOOKS
// DELETE /books
// Private Access TODO: Add as protect route
exports.deleteAllBooks = async (req, res) => {
    try {
        const books = await Books.deleteMany();

        if (!books) {
            return res.status(404).json({ success: true, message: "No books found" });
        }

        return res.status(200).json({ success: true, message: "All books deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
