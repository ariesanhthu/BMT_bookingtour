import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface định nghĩa các thuộc tính của Customer
export interface ICustomer extends Document {
  userID: mongoose.Types.ObjectId; 
  products: string[]; 
}

// Schema của Customer
const CustomerSchema: Schema<ICustomer> = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  products: [{ type: String }], 
});

// Export Customer model
export const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
