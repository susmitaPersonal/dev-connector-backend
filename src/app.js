const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { connectDB } = require('./config/db');
const User = require("./models/user");
const userval = require('./validationSchema/auth');

app.use(express.json())

app.post("/signup", async (req, res) => {
    const {success, data, error} = userval.safeParse(req.body);
    if (!success) {
        return res.status(401).json({
            success: false,
            errors: error.format()
        })
    }
    const user = new User(data)
    try {
        await user.save()
        return res.status(200).send("User added successfully.")
    } catch (e) {
        return res.status(400).send("Error saving the user: " + e.message)
    }
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

