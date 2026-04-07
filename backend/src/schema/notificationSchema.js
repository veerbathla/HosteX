import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["fee_due", "maintenance", "event", "other"],
            default: "other",
        },
        target: {
            type: String,
            enum: ["all", "student", "admin", "super_admin"],
            default: "all",
        },
    }, { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);