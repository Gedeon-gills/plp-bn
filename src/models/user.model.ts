// src/models/user.model.ts
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// 1️⃣ Define interface for User document including methods
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'Manager';
  isActive: boolean;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;

  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
}

// 2️⃣ Define schema
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: [true, 'Please provide a name'] },
  email: { type: String, required: [true, 'Please provide an email'], unique: true, lowercase: true },
  password: { type: String, required: [true, 'Please provide a password'], minlength: 8, select: false },
  role: { type: String, enum: ['admin', 'Manager'], default: 'Manager' },
  isActive: { type: Boolean, default: true },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

// 3️⃣ Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 4️⃣ Instance methods
userSchema.methods.correctPassword = async function(candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  return resetToken;
};

// 5️⃣ Create model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;