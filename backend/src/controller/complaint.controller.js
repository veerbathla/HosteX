import Complaint from "../schema/complaintSchema.js";
import mongoose from "mongoose";

// Create complaint (Student)
export const createComplaint = async (req, res) => {
    try {
        const { title, description, hostelId, roomId } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
                data: null,
            });
        }

        const complaint = await Complaint.create({
            userId: req.user._id,
            title: title.trim(),
            description: description.trim(),
            hostelId: hostelId || req.user.hostelId,
            roomId,
        });

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            data: complaint,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create complaint",
            data: null,
        });
    }
};

//  Get all complaints (Admin)
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Complaints fetched successfully",
            data: complaints,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch complaints",
            data: null,
        });
    }
};

//  Get my complaints (Student)
export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            userId: req.user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Complaints fetched successfully",
            data: complaints,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch complaints",
            data: null,
        });
    }
};

//  Update status (Admin)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["pending", "in_progress", "resolved"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint status",
                data: null,
            });
        }

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid complaint id",
                data: null,
            });
        }

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
                data: null,
            });
        }

        complaint.status = status;

        await complaint.save();

        return res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            data: complaint,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update complaint",
            data: null,
        });
    }
};
