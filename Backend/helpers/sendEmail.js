import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { Verification_Email_Template } from "../constant/email.template.js";
dotenv.config();

// Function to send OTP via email
const emailConfig = {
    service: "gmail",
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
};
// 825f32
async function sendEmailOTP(mail, otp) { 
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail, 
        subject: "OTP Verification",
        html: Verification_Email_Template.replace("{verificationCode}",otp), // html body 
        // text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return `OTP sent to ${mail} via email`;
    } catch (error) {
        throw `Error sending OTP to ${mail} via email: ${error}`;
    }
}

export { sendEmailOTP }