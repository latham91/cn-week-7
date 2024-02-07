require("dotenv").config();
require("colors");
const mongoose = require("mongoose");

// Connect to the database
const dbConnect = async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected to db: ${connect.connection.name}`.bgYellow.bold);
};

module.exports = dbConnect;
