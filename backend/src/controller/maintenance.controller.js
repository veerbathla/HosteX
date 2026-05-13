import Maintenance from "../schema/maintenanceSchema.js"

// student raises issue
export const createRequest = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
                data: null,
            });
        }

        const request = await Maintenance.create({
            ...req.body,
            title: title.trim(),
            description: description.trim(),
            studentId: req.user._id,
            hostelId: req.user.hostelId
        });
        return res.status(201).json({
            success: true,
            message: "Maintenance request created successfully",
            data: request,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create maintenance request",
            data: null,
        });
    }
};

// admin views


export const getRequests = async (req, res) => {
    try {
        const requests = await Maintenance.find(); // ya jo tera model hai

        res.status(200).json({
            success: true,
            data: requests,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
