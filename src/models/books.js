const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a title"],
            unique: true,
        },
        author: {
            type: String,
            default: "Unknown Author",
        },
        description: {
            type: String,
            default: "No description available",
        },
        genre: {
            type: String,
            default: "Unknown Genre",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
