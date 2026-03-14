import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/user.model";

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  const adminExists = await User.findOne({ email: "ndagedeo061@gmail.com" });
  if (adminExists) return console.log("Admin already exists");

  const admin = await User.create({
    name: "Super Admin",
    email: "ndagedeo061@gmail.com",
    password: "SuperSecure123",
    role: "admin",
  });

  console.log("✅ Admin created:", admin.email);
  mongoose.disconnect();
};

seedAdmin();