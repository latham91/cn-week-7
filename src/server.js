require("dotenv").config();
require("colors");
const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./db/dbConnect.js");
const bookRoutes = require("./routes/books.js");

const PORT = process.env.PORT;

const app = express();
dbConnect();

// Dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/books", bookRoutes);

// Health check route
app.get("/healthcheck", (req, res) => {
    res.status(200).json({ success: true, message: "Server is running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.bold);
});
