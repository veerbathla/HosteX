import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["super_admin", "admin", "student"],
            default: "student",
        },
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
        },
        roomlId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        },
        phoneNo: {
            type: String,
            unique: true,
        },
        enrollmentNo: {
            type: String,
            unique: true,
            default: () => Math.random().toString().slice(2, 10),
        },
        courses: {
            type: String,
        },
        year: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
};

const User =
    mongoose.models.User || mongoose.model("User", userSchema);

// export default User;
export default mongoose.model("User", userSchema);
