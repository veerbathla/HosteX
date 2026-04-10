import Leave from "../schema/leaveSchema.js";
import mongoose from "mongoose";

// 📝 Apply Leave (student/staff)
export const applyLeave = async (req, res) => {
    try {
        const { fromDate, toDate, reason, hostelId } = req.body;
        if (!fromDate || !toDate || !reason?.trim()) {
            return res.status(400).json({
                success: false,
                message: "From date, to date, and reason are required",
                data: null,
            });
        }

        const leave = await Leave.create({
            userId: req.user._id,
            fromDate,
            toDate,
            reason: reason.trim(),
            hostelId: hostelId || req.user?.hostelId,
        });

        return res.status(201).json({
            success: true,
            message: "Leave applied successfully",
            data: leave,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to apply leave",
            data: null,
        });
    }
};

// 👤 My Leaves
export const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ userId: req.user._id });
        return res.status(200).json({
            success: true,
            message: "Leaves fetched successfully",
            data: leaves,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch leaves",
            data: null,
        });
    }
};

// 👨‍💼 Admin: All Leaves
export const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Leaves fetched successfully",
            data: leaves,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch leaves",
            data: null,
        });
    }
};

// ✅ Approve / Reject
export const updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["pending", "approved", "rejected"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid leave status",
                data: null,
            });
        }

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid leave id",
                data: null,
            });
        }

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                success: false,
                message: "Leave not found",
                data: null,
            });
        }

        leave.status = status;
        leave.approvedBy = req.user._id;

        await leave.save();

        return res.status(200).json({
            success: true,
            message: "Leave status updated successfully",
            data: leave,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to update leave",
            data: null,
        });
    }
};
