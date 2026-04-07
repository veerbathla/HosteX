//prevent data leakage between hostels
//makes app multi-tenant
import Hostel from "../schema/HostelSchema.js";
import User from "../schema/User.js";
const checkHostelAccess = async (req, res, next) => {
    const hostelId = req.params.hostelId || req.body.hostelId;
    if (!hostelId) {
        return res.status(400).json({ message: "Hostel ID is required" });
    }
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
    }
    if (hostel.admins.includes(req.user.id)) {
        return res.status(403).json({ message: "Not authorized" });
    }
    if (req.user.role === "super_admin" && req.user.hostelId.toString() !== hostelId.toString()) {
        return res.status(403).json({ message: "Not authorized" });
    }
    next();
}
export default checkHostelAccess;