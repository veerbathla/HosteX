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
        const filter = req.user.hostelId ? { hostelId: req.user.hostelId } : {};
        const requests = await Maintenance.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Maintenance requests fetched successfully",
            data: requests,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch maintenance requests",
            data: null,
        });
    }
};
