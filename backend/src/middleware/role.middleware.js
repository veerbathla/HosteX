//control access :admin/student/super_admin
export const authRole = (...roles) => {
    const allowedRoles = roles.flat();

    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
                data: null,
            });
        }
        return next();
    };
};
