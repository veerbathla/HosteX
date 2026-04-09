import Maintenance from "../schema/maintenanceSchema.js"

// student raises issue
export const createRequest = async (req, res) => {
    try {
        const request = await Maintenance.create({
          ...req.body,
          studentId: req.user._id,
          hostelId: req.user.hostelId
        });
        res.status(200).json(request);
        
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
};

// admin views
export const getRequests = async (req, res) => {
    try {
        const requests = await Maintenance.find({ hostelId: req.user.hostelId });
        res.status(200).json(requests);
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
};