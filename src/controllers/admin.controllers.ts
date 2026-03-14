import { Request, Response } from "express";
import Subscriber from "../models/subscribe.model";
import User from "../models/user.model";
import { catchAsync } from "../utils/CatchAsynch";
import { AppError } from "../utils/AppError";

// Get All subscribers (only admin)
export const getSubscribers = catchAsync(async (req: Request, res: Response) => {
  const subscribers = await Subscriber.find().select("email createdAt -_id");
  res.status(200).json({
    success: true,
    count: subscribers.length,
    subscribers,
  });
});

// Create Manager (only admin)
export const createManager = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw new AppError("Please provide all fields", 400);

  const existing = await User.findOne({ email });
  if (existing) throw new AppError("User with this email already exists", 400);

  const manager = await User.create({
    name,
    email,
    password,
    role: "Manager",
  });

  res.status(201).json({
    success: true,
    user: {
      name: manager.name,
      email: manager.email,
      role: manager.role,
    },
  });
});

// Get All Managers (only admin)
export const getManagers = catchAsync(async (req: Request, res: Response) => {
  const managers = await User.find({ role: "Manager" }).select("name email createdAt -_id");
  res.status(200).json({
    success: true,
    count: managers.length,
    managers,
  });
});