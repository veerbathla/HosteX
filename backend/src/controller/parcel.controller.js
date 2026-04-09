import Parcel from "../schema/parcelSchema.js";

// add parcel
export const addParcel = async (req, res) => {
    try {
        const parcel = await Parcel.create(req.body);
        res.status(201).json(parcel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// mark collected
export const collectParcel = async (req, res) => {
    const parcel = await Parcel.findById(req.params.id);

    parcel.collected = true;
    parcel.collectedAt = new Date();

    await parcel.save();

    res.json(parcel);
};

// get parcels
export const getParcels = async (req, res) => {
    const data = await Parcel.find().populate("studentId", "name");
    res.json(data);
};