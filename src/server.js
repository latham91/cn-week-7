const express = require("express");

const app = express();

app.use("/example", express.static("example"));
app.use("/portfolio", express.static("portfolio"));

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
