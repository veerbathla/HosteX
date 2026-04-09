import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
    },

    entryTime: Date,
    exitTime: Date,

    status: {
      type: String,
      enum: ["in", "out"],
      default: "in",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Entry", entrySchema);