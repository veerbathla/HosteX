import Visitor from "../schema/visitorSchema.js";

// entry
export const createEntry = async (req, res) => {
    try {
        const visitor = await Visitor.create(req.body);
        res.status(201).json(visitor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exit
export const markExit = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);

        visitor.exitTime = new Date();
        visitor.status = "exited";

        await visitor.save();

        res.json(visitor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get all logs
export const getVisitors = async (req, res) => {
    const data = await Visitor.find().populate("visitingTo", "name");
    res.json(data);
};