import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://VeerBathla676676:Veer0620@hostex.dllpym7.mongodb.net/");
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);//1 means failiure
    }
}