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
      replyTo: email,
      subject: subject || "New Contact Message",
      html: contactEmailTemplate(name, email, subject, message),
    });

    // 2️⃣ Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting us.</p>
        <p>We have received your message and we will Contact you soon after reviewing your message.</p>
        <br/>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Best regards,<br/>PLP Support Team</p>
      `,
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