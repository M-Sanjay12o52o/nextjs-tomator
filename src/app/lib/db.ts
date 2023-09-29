import mongoose, { Document, Model } from 'mongoose';

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: String,
});

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);