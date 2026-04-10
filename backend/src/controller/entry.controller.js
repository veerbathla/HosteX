import Entry from "../schema/entrySchema.js";

// 🚶 Student Exit
export const studentExit = async (req, res) => {
    try {
        const { studentId, hostelId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required",
                data: null,
            });
        }

        const entry = await Entry.create({
            studentId,
            hostelId: hostelId || req.user?.hostelId,
            exitTime: new Date(),
            status: "out",
        });

        return res.status(201).json({
            success: true,
            message: "Student exit recorded",
            data: entry,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to mark student exit",
            data: null,
        });
    }
};

// 🏠 Student Entry (return)
export const studentEntry = async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required",
                data: null,
            });
        }

        const entry = await Entry.create({
            studentId,
            hostelId: req.body.hostelId || req.user?.hostelId,
            entryTime: new Date(),
            status: "in",
        });

        return res.status(201).json({
            success: true,
            message: "Student entry recorded",
            data: entry,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to mark student entry",
            data: null,
        });
    }
};

// 📄 Get logs (admin/guard)
export const getLogs = async (req, res) => {
    try {
        const logs = await Entry.find()
            .populate("studentId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Entry logs fetched successfully",
            data: logs,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch entry logs",
            data: null,
        });
    }
};
