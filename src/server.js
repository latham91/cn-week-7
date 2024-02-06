const express = require("express");

const app = express();

app.use(express.json());

const bookData = [
    {
        id: 1,
        name: "The Great Gatsby",
    },
    {
        id: 2,
        name: "To Kill a Mockingbird",
    },
];

app.get("/books", (req, res) => {
    res.status(200).json({ success: true, data: bookData });
});

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

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
