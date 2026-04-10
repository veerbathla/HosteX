import mongoose from "mongoose";
import Room from "../schema/roomSchema.js"

export const createRoom = async (req, res) => {
    try {
        const { roomNo, roomNumber, capacity } = req.body;
        const resolvedRoomNo = roomNo || roomNumber;

        if (!resolvedRoomNo || !capacity || Number(capacity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Room number and valid capacity are required",
                data: null,
            });
        }

        const room = await Room.create({
            ...req.body,
            roomNo: resolvedRoomNo,
            hostelId: req.user.hostelId
        });
        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            data: room,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create room",
            data: null,
        });
    }
};

const roomPopulate = {
    path: "occupants",
    select: "name email enrollmentNo courses year",
};

export const getRooms = async (req, res) => {
    try {
        const filter = req.user.hostelId ? { hostelId: req.user.hostelId } : {};
        const rooms = await Room.find(filter)
            .populate(roomPopulate)
            .sort({ roomNo: 1 });
        return res.status(200).json({
            success: true,
            message: "Rooms fetched successfully",
            data: rooms,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch rooms",
            data: null,
        });
    }
};

export const getMyRoom = async (req, res) => {
    try {
        if (!req.user.roomlId) {
            return res.status(200).json({
                success: true,
                message: "No room assigned",
                data: null,
            });
        }

        const room = await Room.findById(req.user.roomlId).populate(roomPopulate);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Assigned room not found",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room fetched successfully",
            data: room,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch assigned room",
            data: null,
        });
    }
};

export const updateRoom = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room id",
                data: null,
            });
        }

        const filter = req.user.hostelId
            ? { _id: req.params.id, hostelId: req.user.hostelId }
            : { _id: req.params.id };

        const room = await Room.findOne(filter);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
                data: null,
            });
        }

        const capacity = Number(room.capacity ?? 0);
        const nextOccupancy = req.body.currentOccupancy ?? req.body.occupants;
        const resolvedOccupancy = nextOccupancy === undefined
            ? room.currentOccupancy
            : Math.max(0, Math.min(Number(nextOccupancy) || 0, capacity));

        const resolvedStatus = req.body.status || (
            resolvedOccupancy > 0 ? "occupied" : "available"
        );

        room.currentOccupancy = resolvedOccupancy;
        room.isOccupied = resolvedOccupancy > 0;
        room.status = resolvedStatus;

        if (req.body.assignedStudentName !== undefined) {
            room.assignedStudentName = req.body.assignedStudentName;
        }
        if (req.body.assignedStudentInitials !== undefined) {
            room.assignedStudentInitials = req.body.assignedStudentInitials;
        }
        if (req.body.assignedSince !== undefined) {
            room.assignedSince = req.body.assignedSince;
        }
        if (req.body.maintenanceNote !== undefined) {
            room.maintenanceNote = req.body.maintenanceNote;
        }

        if (resolvedStatus === "maintenance" && !room.maintenanceNote) {
            room.maintenanceNote = "Maintenance scheduled";
        }

        if (resolvedStatus === "available") {
            room.maintenanceNote = req.body.maintenanceNote ?? "";
        }

        await room.save();

        const updatedRoom = await Room.findById(room._id).populate(roomPopulate);

        return res.status(200).json({
            success: true,
            message: "Room updated successfully",
            data: updatedRoom,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update room",
            data: null,
        });
    }
};
