import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
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

        fromDate: {
            type: Date,
            required: true,
        },

        toDate: {
            type: Date,
            required: true,
        },

        reason: {
            type: String,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // admin
        },
    },
    { timestamps: true }
);

const Leave =
    mongoose.models.Leave || mongoose.model("Leave", leaveSchema);

export default Leave;