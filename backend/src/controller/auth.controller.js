import User from "../schema/User.js";
import jwt from "jsonwebtoken";

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

//signup
export const register = async (req, res) => {
    try {
        const { name, email, password, role, hostelId } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role,
            hostelId,
        });
        res.status(201).json({
            _id: user._id,
            role: user.role,
            token: generateToken(user._id),
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                role: user.role,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(401).json({
                message: "Invalid credentials",
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

//Logout
export const logout = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successfully",
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}