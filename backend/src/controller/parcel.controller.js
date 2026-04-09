import Parcel from "../schema/parcelSchema.js";
import mongoose from "mongoose";

// 📦 Add Parcel
export const addParcel = async (req, res) => {
    try {
        const { studentId, description, parcelFrom, hostelId, receivedBy } = req.body;

        if (!studentId && !description && !parcelFrom) {
            return res.status(400).json({
                success: false,
                message: "Student or parcel description is required",
                data: null,
            });
        }

        const parcel = await Parcel.create({
            studentId,
            description,
            parcelFrom: parcelFrom || description,
            hostelId: hostelId || req.user?.hostelId,
            receivedBy,
            collected: false,
        });

        return res.status(201).json({
            success: true,
            message: "Parcel added successfully",
            data: parcel,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to add parcel",
            data: null,
        });
    }
};

// ✅ Mark Parcel as Collected
export const collectParcel = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid parcel id",
                data: null,
            });
        }

        const parcel = await Parcel.findById(req.params.id);

        // ❗ important check
        if (!parcel) {
            return res.status(404).json({
                success: false,
                message: "Parcel not found",
                data: null,
            });
        }

        parcel.collected = true;
        parcel.collectedAt = new Date();

        await parcel.save();

        return res.status(200).json({
            success: true,
            message: "Parcel collected successfully",
            data: parcel,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to collect parcel",
            data: null,
        });
    }
};

// 📄 Get All Parcels
export const getParcels = async (req, res) => {
    try {
        const data = await Parcel.find()
            .populate("studentId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Parcels fetched successfully",
            data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch parcels",
            data: null,
        });
    }
};
