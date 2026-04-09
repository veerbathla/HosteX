import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,

        visitingTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // student
        },

        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },

        entryTime: {
            type: Date,
            default: Date.now,
        },

        exitTime: {
            type: Date,
        },

        purpose: String,

        status: {
            type: String,
            enum: ["entered", "exited"],
            default: "entered",
        },
    },
    { timestamps: true }
);
export default mongoose.model("Visitor", visitorSchema);