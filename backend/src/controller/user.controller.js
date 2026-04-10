import User from "../schema/User.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedRoles = ["admin", "student", "gatekeeper", "super_admin"];

// Add student
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role = "student", hostelId, ...rest } = req.body;

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
                data: null,
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email address",
                data: null,
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
                data: null,
            });
        }

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
                data: null,
            });
        }

        if (["admin", "super_admin"].includes(role) && req.user?.role !== "super_admin") {
            return res.status(403).json({
                success: false,
                message: "Only super admins can create admin accounts",
                data: null,
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
                data: null,
            });
        }

        const user = await User.create({
            ...rest,
            name: name.trim(),
            email: email.toLowerCase(),
            password,
            role,
            hostelId: hostelId || req.user?.hostelId,
        });

        const safeUser = await User.findById(user._id).select("-password");

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: safeUser,
        });
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: "Unable to create user",
            data: null,
        });
    }
};

// Get all students
export const getUsers = async (req, res) => {
    try {
          const filter = req.user?.hostelId ? { hostelId: req.user.hostelId } : {};
          const users = await User.find(filter)
            .populate("roomlId", "roomNo floor capacity type")
            .select("-password")
            .sort({ createdAt: -1 });
          return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
          });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Unable to fetch users",
            data: null,
        });
    }
};
