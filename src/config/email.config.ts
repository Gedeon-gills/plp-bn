import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
  family: 4, // to force IPv4
} as SMTPTransport.Options); // ✅ cast as SMTPTransport.Options

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email Service Error:", error);
  } else {
    console.log("✅ Email Service Ready");
  }
});

export default transporter;