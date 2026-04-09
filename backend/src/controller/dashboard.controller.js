import User from "../schema/User.js";
import Room from "../schema/roomSchema.js";
import Complaint from "../schema/complaintSchema.js";

//get dashboard stats
export const getDashboard = async (req, res) => {
    try {
        const filter = req.user.hostelId ? { hostelId: req.user.hostelId } : {};
        const totalStudents = await User.countDocuments({
            ...filter,
            role: "student",
        });
        const totalRooms = await Room.countDocuments(filter);
        const totalOccupiedRooms = await Room.countDocuments({
            ...filter,
            isOccupied: true,
        });
        const totalVacantRooms = await Room.countDocuments({
            ...filter,
            isOccupied: false,
        });
        const totalAdmins = await User.countDocuments({
            ...filter,
            role: "admin",
        });
        const totalComplaints = await Complaint.countDocuments(filter);
        const pendingComplaints = await Complaint.countDocuments({
            ...filter,
            status: { $in: ["pending", "in_progress"] },
        });
        return res.status(200).json({
            success: true,
            message: "Dashboard fetched successfully",
            data: {
                totalStudents,
                totalRooms,
                totalOccupiedRooms,
                totalVacantRooms,
                totalAdmins,
                totalComplaints,
                pendingComplaints,
                urgentComplaints: pendingComplaints,
                staffTasks: pendingComplaints,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch dashboard",
            data: null,
        });
    }
}
