// utils/nodemailer.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendOTPByEmail = async (email, otp) => {
    const mailInfo = {
        from: 'suvaranjan@email.com', // Sender's email address
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailInfo);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};


module.exports = sendOTPByEmail;
