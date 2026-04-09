import Visitor from "../schema/visitorSchema.js";

// 🚪 Visitor Entry
export const createEntry = async (req, res) => {
    try {
        const visitor = await Visitor.create({
            ...req.body,
            entryTime: new Date(),
            status: "entered",
        });

        res.status(201).json(visitor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🚶 Visitor Exit
export const markExit = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);

        // ❗ important check
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        visitor.exitTime = new Date();
        visitor.status = "exited";

        await visitor.save();

        res.status(200).json(visitor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📄 Get All Visitor Logs
export const getVisitors = async (req, res) => {
    try {
        const data = await Visitor.find()
            .populate("visitingTo", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};