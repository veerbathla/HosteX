// check if user is logged in

import jwt from "jsonwebtoken";
import User from "../schema/User.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized",
                    data: null,
                });
            }

            return next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Not authorized",
                data: null,
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token missing",
            data: null,
        });
    }
};
