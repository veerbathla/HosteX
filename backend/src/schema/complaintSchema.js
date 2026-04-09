import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["pending", "in_progress", "resolved"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
