const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a title"],
        },
        author: {
            type: String,
            required: [true, "Please add an author"],
        },
        description: {
            type: String,
            required: [true, "Please add a description"],
        },
        genre: {
            type: String,
            required: [true, "Please add a genre"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
