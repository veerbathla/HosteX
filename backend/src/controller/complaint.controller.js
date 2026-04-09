import Complaint from "../schema/complaintSchema.js";

// Create complaint (Student)
export const createComplaint = async (req, res) => {
    try {
        const { title, description, hostelId, roomId } = req.body;

        const complaint = await Complaint.create({
            userId: req.user._id,
            title,
            description,
            hostelId,
            roomId,
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Get all complaints (Admin)
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Get my complaints (Student)
export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            userId: req.user._id,
        });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Update status (Admin)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        complaint.status = status || complaint.status;

        await complaint.save();

        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};