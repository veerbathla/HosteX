import Entry from "../schema/entrySchema.js";

// 🚶 Student Exit
export const studentExit = async (req, res) => {
    try {
        const { studentId, hostelId } = req.body;

        const entry = await Entry.create({
            studentId,
            hostelId,
            exitTime: new Date(),
            status: "out",
        });

        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🏠 Student Entry (return)
export const studentEntry = async (req, res) => {
    try {
        const { studentId } = req.body;

        const entry = await Entry.create({
            studentId,
            entryTime: new Date(),
            status: "in",
        });

        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📄 Get logs (admin/guard)
export const getLogs = async (req, res) => {
    try {
        const logs = await Entry.find()
            .populate("studentId", "name email")
            .sort({ createdAt: -1 });

        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};