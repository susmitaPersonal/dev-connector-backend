// const mongoose = require('mongoose')
// const dotenv = require('dotenv');
// dotenv.config();
import mongoose from 'mongoose';

export const connectDB = async () => {
    console.log(process.env.MONGO_URI );
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}