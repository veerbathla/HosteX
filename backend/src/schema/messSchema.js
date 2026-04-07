import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
   {
      studentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      hostelId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Hostel",
      },
      balance: {
         type: Number,
         default: 0,
      },
      lastRecharge: {
         type: Date,
         default: Date.now,
      },
      transaction: {
         amount: Number,
         type: {
            type: String,
            enum: ["credit", "debit"]
         },
         date: {
            type: Date,
            default: Date.now,
         },
      }
   }
)
export default mongoose.model("Mess", feeSchema);