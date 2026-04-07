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
            unique: true,
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
    }
)

export default mongoose.model("Room", roomSchema);
