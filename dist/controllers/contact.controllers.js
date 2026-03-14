"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactMessage = void 0;
const contact_model_1 = __importDefault(require("../models/contact.model"));
const email_config_1 = __importDefault(require("../config/email.config"));
const contactEmailTemplate_1 = require("../templates/contactEmailTemplate");
const sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required",
            });
        }
        // Save message in database
        const newMessage = await contact_model_1.default.create({
            name,
            email,
            subject,
            message,
        });
        // Send email to admin
        await email_config_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: subject || "New Contact Message",
            html: (0, contactEmailTemplate_1.contactEmailTemplate)(name, email, subject, message),
        });
        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage,
        });
    }
    catch (error) {
        console.error("Contact Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message,
        });
    }
};
exports.sendContactMessage = sendContactMessage;
