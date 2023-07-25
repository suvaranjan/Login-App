const generateOTP = require("../utils/generateOtp");
const sendOTPByEmail = require("../utils/nodeMailer");
const User = require("../models/User");
const OtpModel = require("../models/otpmodel");
const bcrypt = require("bcrypt");

// Assuming you have defined the `User` and `OtpModel` models and imported the necessary functions for OTP generation and sending emails.

// Updated forgotPassword function (same as before)

const forgotPassword = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if there is an existing OTP for the user's email
        const existingOtp = await OtpModel.findOne({ email: user.email });
        const validOtpDuration = 10 * 60 * 1000;
        // If there is an existing OTP and it has not expired, resend the same OTP
        if (existingOtp && Date.now() - existingOtp.createdAt.getTime() < validOtpDuration) {
            console.log("Resending existing OTP: ", existingOtp.otp);
            await sendOTPByEmail(user.email, existingOtp.otp);

            return res.status(200).json({
                message: "OTP is sent to your mail",
                OTP: existingOtp.otp,
            });
        }

        // Generate a new OTP
        const otp = generateOTP();
        const otpsent = await sendOTPByEmail(user.email, otp);

        if (!otpsent) {
            return res.status(500).json({ message: "Failed to send OTP via email" });
        }

        // Save the new OTP in the database
        await OtpModel.findOneAndUpdate(
            { email: user.email },
            { otp: otp, createdAt: new Date() },
            { upsert: true }
        );

        console.log("Saved new OTP in the database: ", otp);

        res.status(200).json({
            message: "OTP is sent to your mail",
            OTP: otp,
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", Error: error.message });
        console.log(error.message);
    }
};


// New function to handle the OTP resend feature

const resendOTP = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username: username });

        const existingOtp = await OtpModel.findOne({ email: user.email });

        if (existingOtp) {
            // User has an existing OTP, generate a new one and send it
            const otp = generateOTP();
            const otpsent = await sendOTPByEmail(user.email, otp);

            if (!otpsent) {
                return res.status(500).json({ message: "Failed to send OTP via email" });
            }

            // Update the existing OTP with the new OTP and 10-minute expiration time
            existingOtp.otp = otp;
            existingOtp.createdAt = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes from now
            await existingOtp.save();
            console.log("Updated New OTP in the database: ", otp);
            res.status(200).json({
                message: "OTP is sent to your mail",
                OTP: otp,
            });
        } else {
            // Generate and send a new OTP
            const otp = generateOTP();
            const otpsent = await sendOTPByEmail(user.email, otp);

            if (!otpsent) {
                return res.status(500).json({ message: "Failed to send OTP via email" });
            }

            // Save the new OTP with 10-minute expiration time
            await OtpModel.create({
                email: user.email,
                otp: otp,
                createdAt: new Date(new Date().getTime() + 10 * 60 * 1000), // 10 minutes from now
            });

            console.log("Saved new OTP in the database: ", otp);
            res.status(200).json({
                message: "OTP is sent to your mail",
                OTP: otp,
            });
        }


    } catch (error) {
        res.status(500).json({ message: "Internal server error", Error: error.message });
        console.log(error.message);
    }
};

const verifyOtp = async (req, res) => {
    const { username, otp: userOtp } = req.body;
    try {
        const { email } = await User.findOne({ username });

        const { otp: dbOtp } = await OtpModel.findOne({ email });

        if (userOtp === dbOtp) {
            res.status(200).json({ message: "OTP Verified" })
        } else {
            res.status(400).json({ message: "Invalid OTP Try Resend!!" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const resetPassword = async (req, res) => {
    const { username, password: newPassword } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.findOneAndUpdate(
            { username },
            { password: hashedPassword },
            { new: true }
        );
        res.status(200).json({ message: "Password Reset Successfull" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = { forgotPassword, resendOTP, verifyOtp, resetPassword };
