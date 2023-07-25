// Import necessary modules and services
// const profileService = require('../services/profileService');

const User = require("../models/User")

// GET: /api/profile
const getProfile = async (req, res) => {
    const { user } = req;
    const email = user.email;
    try {
        const existingUser = await User.findOne({ email }).select('-password');

        if (!existingUser) {
            return res.status(400).json({ error: 'User not available' });
        }

        res.status(200).json(existingUser);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT: /api/profile
const updateProfile = async (req, res) => {

    const id = req.user.userId;
    console.log(req.user);

    const {
        firstname,
        lastname,
        phone,
        email,
        address,
    } = req.body;

    try {
        await User.findOneAndUpdate({ _id: id }, {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            address: address,
        }, { new: true });

        res.status(201).json("Profile Updated");

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getProfile,
    updateProfile,
};
