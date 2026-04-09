import Visitor from "../schema/visitorSchema.js";
import mongoose from "mongoose";

// 🚪 Visitor Entry
export const createEntry = async (req, res) => {
    try {
        const { name, phone, purpose, visitingTo, hostelId } = req.body;

        if (!name?.trim() || !phone?.trim() || !purpose?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name, phone, and purpose are required",
                data: null,
            });
        }

        const visitor = await Visitor.create({
            name: name.trim(),
            phone: phone.trim(),
            purpose: purpose.trim(),
            visitingTo,
            hostelId: hostelId || req.user?.hostelId,
            entryTime: new Date(),
            status: "entered",
        });

        return res.status(201).json({
            success: true,
            message: "Visitor entry created successfully",
            data: visitor,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to create visitor entry",
            data: null,
        });
    }
};

// 🚶 Visitor Exit
export const markExit = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid visitor id",
                data: null,
            });
        }

        const visitor = await Visitor.findById(req.params.id);

        // ❗ important check
        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found",
                data: null,
            });
        }

        visitor.exitTime = new Date();
        visitor.status = "exited";

        await visitor.save();

        return res.status(200).json({
            success: true,
            message: "Visitor exit recorded",
            data: visitor,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to mark visitor exit",
            data: null,
        });
    }
};

// 📄 Get All Visitor Logs
export const getVisitors = async (req, res) => {
    try {
        const data = await Visitor.find()
            .populate("visitingTo", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Visitors fetched successfully",
            data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch visitors",
            data: null,
        });
    }
};
