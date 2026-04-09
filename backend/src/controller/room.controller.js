import Room from "../schema/roomSchema.js"

export const createRoom = async (req, res) => {
    try {
        const room = await Room.create({
          ...req.body,
          hostelId: req.user.hostelId
        });
        res.status(200).json(room);
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ hostelId: req.user.hostelId });
        res.json(rooms);
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
};