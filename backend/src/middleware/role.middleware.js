//control access :admin/student/super_admin
import User from "../schema/User.js";
export const authRole = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied" });
        }
        next();
    }
};
