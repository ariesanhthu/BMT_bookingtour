import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface định nghĩa các thuộc tính của User
export interface IUser extends Document {
  username: string;
  password: string;
  roles: mongoose.Types.ObjectId[]; // Liên kết với Role
}

// Schema của User
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }], // Array of Role IDs
});

// Export User model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
