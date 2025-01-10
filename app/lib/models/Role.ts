import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface định nghĩa các thuộc tính của Role
export interface IRole extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string; // Mô tả là tùy chọn
  users: mongoose.Types.ObjectId[]; // Liên kết với User
}

// Schema của Role
const RoleSchema: Schema<IRole> = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of User IDs
});

// Export Role model
export const Role: Model<IRole> = mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);
