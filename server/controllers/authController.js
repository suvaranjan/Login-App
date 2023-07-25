
// const authService = require('../services/authService');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST: /api/register
// Register route

const checkUser = async (req, res) => {
    const { username } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(200).json({ find: true, message: 'user available' });
        } else {
            return res.status(200).json({
                find: false,
                message: "No user associated with this username"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Inernal server error"
        })
    }


}


const register = async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    // res.status(201).json({ message: "Registration success" })
    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// POST: /api/login
const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username)

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Passwords match, create a JWT token
        const payload = {
            userId: user._id,
            email: user.email
        };

        const options = {
            expiresIn: '1h'
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        // Send the token back to the client
        return res.status(200).json({ token, message: "Login successful" });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "An error occurred while processing the request" });
    }
};
// POST: /api/logout
const logout = (req, res) => {
    res.status(200).json({ message: "Logout User" })
};



// Export the controller functions
module.exports = {
    checkUser,
    register,
    login,
    logout,
};
