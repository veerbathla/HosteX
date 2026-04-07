import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
            unique: true,
        },
        hostelId: {
            type: String,
            required: true,
            unique: true,
        },
        totalRooms: {
            type: Number,
            required: true,
        },
        totalFloors: {
            type: Number,
            required: true,
        },
        admins: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription",
        },
        roomlId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    }
)

export default mongoose.model("Hostel", hostelSchema);