import User from "../schema/User.js";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accessTokenExpiry = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

//generate token
const generateAccessToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not configured");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: accessTokenExpiry,
    });
};

const generateRefreshToken = (id) => {
    if (!process.env.JWT_REFRESH_SECRET && !process.env.JWT_SECRET) {
        throw new Error("JWT secret is not configured");
    }

    return jwt.sign({ id, type: "refresh" }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: refreshTokenExpiry,
    });
};

const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const safeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    hostelId: user.hostelId,
    enrollmentNo: user.enrollmentNo,
    roomlId: user.roomlId,
});

const authResponse = (user, message) => {
    const accessToken = generateAccessToken(user._id);
    const userPayload = safeUser(user);

    return {
        success: true,
        message,
        data: {
            user: userPayload,
            accessToken,
        },
        user: userPayload,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: accessToken,
    };
};

const sendAuthResponse = (res, statusCode, user, message) => {
    res.cookie("refreshToken", generateRefreshToken(user._id), cookieOptions);
    return res.status(statusCode).json(authResponse(user, message));
};

//signup
export const register = async (req, res) => {
    try {
        const { name, email, password, role = "student", hostelId } = req.body;

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

        if (role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Only student accounts can self-register",
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
            name: name.trim(),
            email: email.toLowerCase(),
            password,
            role,
            hostelId,
        });

        return sendAuthResponse(res, 201, user, "Registration successful");
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to register user",
            data: null,
        });
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
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

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                data: null,
            });
        }

        return sendAuthResponse(res, 200, user, "Login successful");
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to login",
            data: null,
        });
    }
}

//Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logout successfully",
            data: null,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to logout",
            data: null,
        });
    }
}

export const refresh = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
                data: null,
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        );

        if (decoded.type !== "refresh") {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
                data: null,
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
                data: null,
            });
        }

        return sendAuthResponse(res, 200, user, "Session refreshed");
    } catch (error) {
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(401).json({
            success: false,
            message: "Session expired. Please login again.",
            data: null,
        });
    }
};

export const me = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Current user fetched",
        data: safeUser(req.user),
        user: safeUser(req.user),
    });
};
