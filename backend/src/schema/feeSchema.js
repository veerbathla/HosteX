import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        },
        amount: {
            type: Number,
            required: true,
        },
        dueDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid",
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "online"],
            default: "cash",
        },
        transactionId: {
            type: String,
            unique: true,
        },
    }
)

export default mongoose.model("Fee", feeSchema);