import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },

        receivedBy: String, // guard name

        parcelFrom: String, // Amazon, Flipkart etc.

        receivedAt: {
            type: Date,
            default: Date.now,
        },

        collected: {
            type: Boolean,
            default: false,
        },

        collectedAt: Date,
    },
    { timestamps: true }
);
export default mongoose.model("Parcel", parcelSchema);