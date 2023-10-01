const bcrypt = require("bcrypt");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail-templates/Otp");

require("dotenv").config();

exports.sendOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("errors", errors.errors[0].msg);
            return res.status(500).json({
                success: false,
                message: errors.errors[0].msg,
            });
        }

        const { email , password , confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "Password does not match",
            });
        }


        const isPresent = await User.findOne({ email });
        console.log("isPresent", isPresent);
        if (isPresent) {
            return res.status(402).json({
                success: false,
                message: "User already exist",
            });
        }

        let isOtpPresent;
        do {
            var otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            isOtpPresent = await OTP.findOne({ otp: otp });
        } while (isOtpPresent);

        await OTP.findOneAndDelete({ email });
        const response = await OTP.create({ email, otp });
        console.log(response);

        await mailSender(email, "OTP for verification", otpTemplate(otp));

        res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            data: response,
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: "Failed to send otp",
            error: e.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, location, confirmPassword, otp } = req.body;


        const otpResponse = await OTP.findOne({ email });

        if (otp != otpResponse.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid otp",
            });
        }
        const hashedpass = await bcrypt.hash(password, 10);

        const response = await User.create({
            name,
            location,
            email,
            password: hashedpass,
        });

        res.status(200).json({
            success: true,
            message: "Successfully signed up ",
            data: response,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Failed to sign up ",
            error: e.message,
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: "Enter all the fields",
            });
        }

        const user = await User.find({ email });

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user exist for this account",
            });
        }

        const isValid = await bcrypt.compare(password, user[0]?.password);
        if (isValid) {
            const payload = {
                email: user.email,
                id: user._id,
                location: user.location,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            console.log(token);
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token: token,
                user,
                message: "Successfully logged in ",
            });
        } else {
            return res.status(402).json({
                success: false,
                message: "Incorrect Password",
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Can not get user",
            error: e.message,
        });
    }
};
