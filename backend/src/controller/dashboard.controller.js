import User from "../schema/User.js";
import Room from "../schema/roomSchema.js";
import Maintenance from "../schema/maintenanceSchema.js";

//get dashboard stats
export const getDashboard = async (req, res) => {
    try {
        const hostelId = req.user.hostelId;
        const totalStudents = await User.countDocuments({
            hostelId: hostelId,
            role: "student",
        });
        const totalRooms = await Room.countDocuments({
            hostelId: hostelId,
        });
        const totalOccupiedRooms = await Room.countDocuments({
            hostelId: hostelId,
            isOccupied: true,
        });
        const totalVacantRooms = await Room.countDocuments({
            hostelId: hostelId,
            isOccupied: false,
        });
        const totalAdmins = await User.countDocuments({
            hostelId: hostelId,
            role: "admin",
        });
        const pendingComplaints = await Maintenance.countDocuments({
            hostelId: hostelId,
            status: "pending",
        });
        res.status(200).json({
            totalStudents,
            totalRooms,
            totalOccupiedRooms,
            totalVacantRooms,
            totalAdmins,
            pendingComplaints
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}