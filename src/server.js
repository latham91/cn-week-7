require("dotenv").config();
require("colors");
const express = require("express");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const dbConnect = require("./db/dbConnect.js");

const bookRoutes = require("./books/routes.js");

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

// Swagger Options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Books API",
            version: "0.1.0",
            description: "Simple CRUD API for books, built with Express and MongoDB.",
            contact: {
                name: "Aaron Latham",
                url: "https://aaronlatham.dev",
                email: "latham91@icloud.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["src/books/routes.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, (req, res, next) => {
    const customCss = `
        .try-out__btn {
        display: none !important;
        }
    `;

    const customJs = `
        window.onload = function() {
        document.getElementsByClassName('try-out')[0].style.display = 'none';
        };
    `;

    swaggerUi.setup(specs, { customCss, customJs })(req, res, next);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.bold);
});
