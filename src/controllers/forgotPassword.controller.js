import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import Staff from '../models/staff.model.js';
import User from '../models/user.model.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

//Empty OTP array
let otpArray = [];

//Generate OTP
async function otpGen() {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
}

//Remove expired OTPs
function removeExpiredOTPs() {
    const currentTime = Date.now();
    otpArray = otpArray.filter(item => item.expiry > currentTime);
}

//Set an interval to periodically remove expired OTPs
setInterval(removeExpiredOTPs, 60000);

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check staff collection
        let user = await Staff.findOne({ email });

        // If no match in staff collection, check users collection
        if (!user) {
            user = await User.findOne({ email });
        }

        // If no match in both collections
        if (!user) {
            return res.status(400).json({ error: "Invalid Email" });
        }

        // Generate and store OTP
        const otp = await otpGen();
        const hashedOTP = await bcrypt.hash(otp, 10);

        // Calculate expiry time (3 mins)
        const expiryTime = Date.now() + 3 * 60 * 1000;

        // Store the OTP and expiry time in the array
        otpArray.push({ email, otp: hashedOTP, expiry: expiryTime });

        // Send OTP to the user's email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json({ message: "OTP sent to your email.\nOTP will expire in 3 minutes" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
        console.log(err);
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if the OTP is correct
        let matchedOTP = null;
        for (const item of otpArray) {
            if (item.email === email && await bcrypt.compare(otp, item.otp)) {
                matchedOTP = item;
                break;
            }
        }

        if (!matchedOTP) {
            return res.status(400).json({ error: "OTP Expired or Invalid" });
        }

        res.json({ message: "OTP verified" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
        console.log(err);
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await Staff.findOne({ email });
        if (user) {
            // Update the password
            user.password = hashedPassword;
            await user.save();
        } else {
            user = await User.findOne({ email });
            if (user) {
                // Update the password
                user.password = hashedPassword;
                await user.save();
            }
        }

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Export the functions
export default { forgotPassword, verifyOTP, resetPassword };
