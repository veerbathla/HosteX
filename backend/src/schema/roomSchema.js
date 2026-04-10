import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomNo: {
            type: String,
            required: true,
            unique: true,
        },
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        floor: {
            type: Number,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        currentOccupancy: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["available", "occupied", "maintenance"],
            default: "available",
        },
        isOccupied: {
            type: Boolean,
            default: false,
        },
        occupants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        type: {
            type: String,
            enum: ["single", "double", "triple", "quad"],
            default: "single",
        },
        assignedStudentName: {
            type: String,
            default: "",
            trim: true,
        },
        assignedStudentInitials: {
            type: String,
            default: "",
            trim: true,
        },
        assignedSince: {
            type: String,
            default: "",
            trim: true,
        },
        maintenanceNote: {
            type: String,
            default: "",
            trim: true,
        },
    }
,
    { timestamps: true }
)

export default mongoose.model("Room", roomSchema);
