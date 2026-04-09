import Leave from "../schema/leaveSchema.js";

// 📝 Apply Leave (student/staff)
export const applyLeave = async (req, res) => {
    try {
        const { fromDate, toDate, reason, hostelId } = req.body;

        const leave = await Leave.create({
            userId: req.user._id,
            fromDate,
            toDate,
            reason,
            hostelId,
        });

        res.status(201).json(leave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 👤 My Leaves
export const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ userId: req.user._id });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 👨‍💼 Admin: All Leaves
export const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Approve / Reject
export const updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }

        leave.status = status;
        leave.approvedBy = req.user._id;

        await leave.save();

        res.json(leave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};