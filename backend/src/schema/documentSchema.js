import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
   {
      studentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      hostelId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Hostel",
      },
      documentType: {
         type: String,
         required: true,
      },
      documentUrl: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         enum: ["pending", "approved", "rejected"],
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
      verified: {
         type: Boolean,
         default: false,
      },
      verifiedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      verifiedAt: {
         type: Date,
         default: Date.now,
      },
   }, { timestamps: true }
)

export default mongoose.model("Document", documentSchema);