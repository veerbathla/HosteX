import Complaint from "../schema/complaintSchema.js";
import mongoose from "mongoose";
import Room from "../schema/roomSchema.js";

const complaintPopulate = [
    { path: "userId", select: "name email enrollmentNo" },
    { path: "roomId", select: "roomNo floor capacity type" },
];

// Create complaint (Student)
export const createComplaint = async (req, res) => {
    try {
        const { title, description, hostelId, roomId, room, priority } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
                data: null,
            });
        }

        let resolvedRoomId = roomId;

        if (!resolvedRoomId && room?.trim()) {
            const matchingRoom = await Room.findOne({
                hostelId: hostelId || req.user.hostelId,
                roomNo: room.trim(),
            }).select("_id");

            if (matchingRoom) {
                resolvedRoomId = matchingRoom._id;
            }
        }

        if (!resolvedRoomId && req.user.roomlId) {
            resolvedRoomId = req.user.roomlId;
        }

        const complaint = await Complaint.create({
            userId: req.user._id,
            title: title.trim(),
            description: description.trim(),
            hostelId: hostelId || req.user.hostelId,
            roomId: resolvedRoomId,
            priority: priority || "medium",
        });

        const populatedComplaint = await Complaint.findById(complaint._id).populate(complaintPopulate);

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            data: populatedComplaint,
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
        const filter = req.user.hostelId ? { hostelId: req.user.hostelId } : {};
        const complaints = await Complaint.find(filter)
            .populate(complaintPopulate)
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
        })
            .populate(complaintPopulate)
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

        const updatedComplaint = await Complaint.findById(complaint._id).populate(complaintPopulate);

        return res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            data: updatedComplaint,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update complaint",
            data: null,
        });
    }
};
