import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["active", "expired"],
            default: "active",
        },
    }, { timestamps: true }
)

export default mongoose.model("Subscription", subscriptionSchema);  