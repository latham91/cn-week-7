const express = require("express");

const app = express();

app.use(express.json());

let bookData = [
    {
        id: 1,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
    },
    {
        id: 2,
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
    },
];

// Get All Books
// Route: GET /books
app.get("/books", (req, res) => {
    res.status(200).json({ success: true, data: bookData });
});

// Add a new book
// Route: POST /books
app.post("/books", (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ success: false, message: "Name is required" });
    }

    const newBook = {
        id: bookData.length + 1,
        name,
    };

    bookData.push(newBook);

    res.status(201).json({ success: true, data: newBook });
});

// Get book by id
// Route: GET /books/:id
app.get("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = bookData.find((book) => book.id === Number(id));

    if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
});

// Delete book by id
// Route: DELETE /books/:id
app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = bookData.find((book) => book.id === Number(id));

    if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
    }

    bookData = bookData.filter((book) => book.id !== Number(id));

    res.status(200).json({ success: true, data: bookData });
});

// Update book by id
// Route: PATCH /books/:id
app.patch("/books/:id", (req, res) => {
    const id = req.params.id;
    const book = bookData.find((book) => book.id === Number(id));

    if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
    }

    let updatedBook = { ...book, ...req.body };

    bookData = bookData.map((book) => (book.id === Number(id) ? updatedBook : book));

    res.status(200).json({ success: true, data: updatedBook });
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
