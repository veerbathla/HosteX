import mongoose from "mongoose";

const maintenaceSchema = new mongoose.Schema(
   {
      hostelId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Hostel",
      },
      roomId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Room",
      },
      studentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      issue: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         enum: ["pending", "in_progress", "completed"],
         default: "pending",
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
      updatedAt: {
         type: Date,
         default: Date.now,
      },
      assignedWorker: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Worker",
      },
      completedAt: {
         type: Date,
         default: Date.now,
      },
      feedback: {
         type: String,
         default: "",
      },
   }, { timestamps: true }
)

export default mongoose.model("Maintenance", maintenaceSchema);