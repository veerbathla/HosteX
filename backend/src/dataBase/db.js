import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/hostex");
        if (process.env.NODE_ENV !== "test") {
            console.info(`MongoDB connected: ${conn.connection.host}`);
        }
    }
    catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
}
