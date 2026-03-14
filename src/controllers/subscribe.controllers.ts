import { Request, Response } from "express";
import Subscriber from "../models/subscribe.model";
import transporter from "../config/email.config";
import { newSubscriberTemplate } from "../templates/newSubscriberTemplate";
import { welcomeSubscriberTemplate } from "../templates/welcomeSubscriberTemplate";

export const subscribeUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    // Save subscriber
    const subscriber = await Subscriber.create({ email });

    // Notify admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Newsletter Subscriber",
      html: newSubscriberTemplate(email),
    });

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Newsletter 🎉",
      html: welcomeSubscriberTemplate(),
    });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: subscriber,
    });
  } catch (error: any) {
    console.error("Subscribe Error:", error);

    return res.status(500).json({
      success: false,
      message: "Subscription failed",
      error: error.message,
    });
  }
};