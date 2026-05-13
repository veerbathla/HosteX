import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    }, { timestamps: true }
)

export default mongoose.model("Event", eventSchema);