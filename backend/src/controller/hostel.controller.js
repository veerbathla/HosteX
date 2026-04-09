import Hostel from "../schema/hostelSchema.js";



// create hostel (super admin)
export const createHostel = async (req, res) => {
    try {
        const hostel = await Hostel.create(req.body);
        res.status(200).json({msg : "Hostel Created.. ",...hostel})
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
        
};

// get all hostels
export const getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        res.status(200).json({...hostels})
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
};