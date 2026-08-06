import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        // `connect` promise resolve hone ka wait karein
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Data Base connected successfully');
    } catch (error) {
        // Error ko log karein aur re-throw karein taaki server.js ise handle kar sake
        console.error("Database connection failed:", error.message);
        throw error;
    }
}

export default connectDB