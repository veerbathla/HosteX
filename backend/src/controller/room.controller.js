import Room from "../schema/roomSchema.js"

export const createRoom = async (req, res) => {
    try {
        const { roomNumber, capacity } = req.body;

        if (!roomNumber || !capacity || Number(capacity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Room number and valid capacity are required",
                data: null,
            });
        }

        const room = await Room.create({
            ...req.body,
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

export const getRooms = async (req, res) => {
    try {
        const filter = req.user.hostelId ? { hostelId: req.user.hostelId } : {};
        const rooms = await Room.find(filter).sort({ roomNumber: 1 });
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
