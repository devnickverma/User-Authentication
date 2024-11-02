import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    try {
        console.log("mongoose : ",process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1); // 1 is failure, 0 state code is success
    }
};

