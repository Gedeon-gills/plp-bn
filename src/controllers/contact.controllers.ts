import { Request, Response } from "express";
import Contact from "../models/contact.model";
import transporter from "../config/email.config";
import { contactEmailTemplate } from "../templates/contactEmailTemplate";

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Save message in database
    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: subject || "New Contact Message",
      html: contactEmailTemplate(name, email, subject, message),
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error: any) {
    console.error("Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};