
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 600, // Set the expiry time for the OTP (in seconds, here 600 seconds = 10 minutes)
        default: Date.now,
    },
});

const OtpModel = mongoose.model('OtpModel', otpSchema);

module.exports = OtpModel;
