import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
    {
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        name: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["cleaner", "maintenance", "guard", "cook", "electrician", "plumber", "other"],
            default: "other",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        assignedTasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Maintenance",
            }
        ]
    }, { timestamps: true }
)

export default mongoose.model("Worker", workerSchema);