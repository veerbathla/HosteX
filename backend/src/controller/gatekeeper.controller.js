import Entry from "../schema/entrySchema.js";
import Visitor from "../schema/visitorSchema.js";
import Parcel from "../schema/parcelSchema.js";

export const getGatekeeperDashboard = async (req, res) => {
    try {
        const hostelId = req.user.hostelId;

        // 📅 Today start
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 🧑‍🎓 Students Inside
        const studentsInside = await Entry.countDocuments({
            hostelId,
            status: "in",
        });

        // 🚪 Students Outside
        const studentsOutside = await Entry.countDocuments({
            hostelId,
            status: "out",
        });

        // 👥 Visitors Today
        const todayVisitors = await Visitor.countDocuments({
            hostelId,
            createdAt: { $gte: today },
        });

        // 📦 Parcels Pending
        const pendingParcels = await Parcel.countDocuments({
            hostelId,
            collected: false,
        });

        // 📦 Parcels Collected Today
        const collectedToday = await Parcel.countDocuments({
            hostelId,
            collected: true,
            updatedAt: { $gte: today },
        });

        // 🧾 Recent Entries (last 5)
        const recentEntries = await Entry.find({ hostelId })
            .populate("studentId", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        // 👥 Recent Visitors (last 5)
        const recentVisitors = await Visitor.find({ hostelId })
            .populate("visitingTo", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            stats: {
                studentsInside,
                studentsOutside,
                todayVisitors,
                pendingParcels,
                collectedToday,
            },
            recentEntries,
            recentVisitors,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};