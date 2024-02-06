const express = require("express");
const verifyRole = require("./middleware/verifyRole");

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
    return res.status(200).json({ success: true, data: bookData });
});

// Add a new book
// Route: POST /books
app.post("/books", verifyRole, (req, res) => {
    const { name, author } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ success: false, message: "Please provide a name" });
        }

        if (!author) {
            return res.status(400).json({ success: false, message: "Please provide an author" });
        }

        const newBook = {
            id: bookData.length + 1,
            name,
            author,
        };

        bookData.push(newBook);

        return res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Get book by id
// Route: GET /books/:id
app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide an id" });
        }

        const book = bookData.find((book) => book.id === Number(id));

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        return res.status(200).json({ success: true, data: book });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Delete book by id
// Route: DELETE /books/:id
app.delete("/books/:id", verifyRole, (req, res) => {
    const id = req.params.id;

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide an id" });
        }

        const book = bookData.find((book) => book.id === Number(id));

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        bookData = bookData.filter((book) => book.id !== Number(id));

        return res.status(200).json({ success: true, data: [] });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Update book by id
// Route: PATCH /books/:id
app.patch("/books/:id", verifyRole, (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ success: false, message: "Please provide an id" });
    }

    const book = bookData.find((book) => book.id === Number(id));

    if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
    }

    let updatedBook = { ...book, ...req.body };

    bookData = bookData.map((book) => (book.id === Number(id) ? updatedBook : book));

    return res.status(200).json({ success: true, data: updatedBook });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide username and password" });
    }

    if (username !== "admin" && password !== "password") {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    req.user = { role: "admin" };
    return res.status(200).json({ success: true, message: "Login successful" });
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
