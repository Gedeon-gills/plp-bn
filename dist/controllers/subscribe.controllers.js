"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeUser = void 0;
const subscribe_model_1 = __importDefault(require("../models/subscribe.model"));
const email_config_1 = __importDefault(require("../config/email.config"));
const newSubscriberTemplate_1 = require("../templates/newSubscriberTemplate");
const welcomeSubscriberTemplate_1 = require("../templates/welcomeSubscriberTemplate");
const subscribeUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        // Check if already subscribed
        const existing = await subscribe_model_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email already subscribed",
            });
        }
        // Save subscriber
        const subscriber = await subscribe_model_1.default.create({ email });
        // Notify admin
        await email_config_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "New Newsletter Subscriber",
            html: (0, newSubscriberTemplate_1.newSubscriberTemplate)(email),
        });
        // Send welcome email to subscriber
        await email_config_1.default.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Our Newsletter 🎉",
            html: (0, welcomeSubscriberTemplate_1.welcomeSubscriberTemplate)(),
        });
        return res.status(201).json({
            success: true,
            message: "Subscribed successfully",
            data: subscriber,
        });
    }
    catch (error) {
        console.error("Subscribe Error:", error);
        return res.status(500).json({
            success: false,
            message: "Subscription failed",
            error: error.message,
        });
    }
};
exports.subscribeUser = subscribeUser;
