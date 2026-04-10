const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

const { connectDB } = require('./config/db');
const authRouter = require('./router/auth')
const profile = require('./router/profile')
const requests = require('./router/request')

dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/profile/', profile)
app.use('/', requests)

// Connect to the database
connectDB().then(() => {
    console.log('Database connection established in app.js');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${process.env.PORT || 5000}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database in app.js:', err);
})

