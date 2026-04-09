import Parcel from "../schema/parcelSchema.js";

// 📦 Add Parcel
export const addParcel = async (req, res) => {
    try {
        const parcel = await Parcel.create({
            ...req.body,
            collected: false,
        });

        res.status(201).json(parcel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Mark Parcel as Collected
export const collectParcel = async (req, res) => {
    try {
        const parcel = await Parcel.findById(req.params.id);

        // ❗ important check
        if (!parcel) {
            return res.status(404).json({ message: "Parcel not found" });
        }

        parcel.collected = true;
        parcel.collectedAt = new Date();

        await parcel.save();

        res.status(200).json(parcel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📄 Get All Parcels
export const getParcels = async (req, res) => {
    try {
        const data = await Parcel.find()
            .populate("studentId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};