const Books = require("./model");

// GET ALL BOOKS
// GET /books
// http://localhost:5001/books
// Public Access
exports.getAllBooks = async (req, res) => {
    if (req.query.title) {
        try {
            const book = await Books.find({ title: req.query.title });

            if (!book) {
                return res.status(404).json({ success: true, message: `No book with title: ${req.query.title}` });
            }

            return res.status(200).json({ success: true, count: book.length, data: book });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    if (req.query.author) {
        const book = await Books.find({ author: req.query.author });

        if (!book) {
            return res.status(404).json({ success: true, message: `No books with author: ${req.query.author}` });
        }

        return res.status(200).json({ success: true, count: book.length, data: book });
    }

    if (req.query.genre) {
        const book = await Books.find({ genre: req.query.genre });

        if (!book) {
            return res.status(404).json({ success: true, message: `No book with genre: ${req.query.genre}` });
        }

        return res.status(200).json({ success: true, count: book.length, data: book });
    }

    try {
        const books = await Books.find();

        if (!books) {
            return res.status(404).json({ success: true, message: "No books found" });
        }

        return res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// GET A BOOK BY ID
// GET /books/:id
// http://localhost:5001/books
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
// http://localhost:5001/books
// Private Access TODO: Add as protect route
exports.addNewBook = async (req, res) => {
    const { title } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ success: false, message: "No title given" });
        }

        const newBook = await Books.create(req.body);

        return res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// UPDATE A BOOK
// PUT /books/:id
// http://localhost:5001/books/:id
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
// http://localhost:5001/books/:id
// Private Access TODO: Add as protect route
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.find(id);

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
// http://localhost:5001/books
// Private Access TODO: Add as protect route
exports.deleteAllBooks = async (req, res) => {
    try {
        const books = await Books.deleteMany();

        if (!books) {
            return res.status(404).json({ success: true, message: "No books found" });
        }

        return res.status(200).json({ success: true, count: books.length, message: "All books deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// UPDATE ANY DETAILS USING TITLE
// PATCH /books/:title
// Private Access TODO: Add as protect route
exports.updateDetailsByTitle = async (req, res) => {
    const { title } = req.params;

    if (!title) {
        return res.status(400).json({ success: false, message: "No title given" });
    }

    try {
        const book = await Books.findOneAndUpdate({ title: title }, req.body, { new: true });

        if (!book) {
            return res.status(404).json({ success: true, message: `Book with title: ${title} not found.` });
        }

        return res.status(200).json({ success: true, data: book });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// UPDATE AUTHOR BY TITLE
// PATCH /books
// Private Access TODO: Add as protect route
exports.updateAuthorByTitle = async (req, res) => {
    const { title, newAuthor } = req.body;

    if (!title && !newAuthor) {
        return res.status(400).json({ success: false, message: "No title given" });
    }

    try {
        const book = await Books.findOneAndUpdate({ title: title }, { author: newAuthor }, { new: true });

        if (!book) {
            return res.status(404).json({ success: true, message: `Book with title: ${title} not found.` });
        }

        return res.status(200).json({ success: true, data: book });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
