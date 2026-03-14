import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";
import { catchAsync } from "../utils/CatchAsynch";
import { AppError } from "../utils/AppError";
import crypto from "crypto";
import transporter from "../config/email.config";
import { resetPasswordTemplate } from "../templates/resetPasswordTemplate";

dotenv.config();

const signToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    }
  );
};

// Login
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  const token = signToken(user._id.toString());

  res.status(200).json({
    success: true,
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// Logout
export const logout = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Frontend reset page
    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset your password",
      html: resetPasswordTemplate(resetURL),
    });

    return res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });

  } catch (error: any) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send reset email",
      error: error.message,
    });
  }
};

// Reset Password
export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) throw new AppError("Token and new password required", 400);

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  }).select("+password");

  if (!user) throw new AppError("Token is invalid or has expired", 400);

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const jwtToken = signToken(user._id.toString());

  res.status(200).json({
    success: true,
    token: jwtToken,
    message: "Password reset successful",
  });
});

