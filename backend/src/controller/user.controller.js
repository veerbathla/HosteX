import User from "../schema/User.js";

// Add student
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
         res.status(500).json({
            message: error.message,
        })
    }
};

// Get all students
export const getUsers = async (req, res) => {
    try {
          const users = await User.find({ hostelId: req.user.hostelId });
          res.status(201).json(users);
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
};