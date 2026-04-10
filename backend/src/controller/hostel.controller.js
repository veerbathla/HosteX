import Hostel from "../schema/hostelSchema.js";



// create hostel (super admin)
export const createHostel = async (req, res) => {
    try {
        const { name, location, hostelId, totalRooms, totalFloors } = req.body;

        if (!name?.trim() || !location?.trim() || !hostelId?.trim() || !totalRooms || !totalFloors) {
            return res.status(400).json({
                success: false,
                message: "Name, location, hostel ID, total rooms, and total floors are required",
                data: null,
            });
        }

        const hostel = await Hostel.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Hostel created successfully",
            data: hostel,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create hostel",
            data: null,
        });
    }

};

// get all hostels
export const getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        return res.status(200).json({
            success: true,
            message: "Hostels fetched successfully",
            data: hostels,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch hostels",
            data: null,
        });
    }
};
