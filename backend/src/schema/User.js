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
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["super_admin", "admin", "student", "gatekeeper"],
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
            sparse: true,
        },
        enrollmentNo: {
            type: String,
            default: () => Math.random().toString().slice(2, 10)
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
    },
    { timestamps: true }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const configuredRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
    const saltRounds = Number.isInteger(configuredRounds) && configuredRounds >= 10 ? configuredRounds : 12;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordCorrect;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
