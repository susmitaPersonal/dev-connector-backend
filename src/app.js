const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { connectDB } = require('./config/db');
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    await user.save()
    
})

// Connect to the database
connectDB().then(() => {
    console.log('Database connection established in app.js');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${process.env.PORT || 5000}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database in app.js:', err);
})

