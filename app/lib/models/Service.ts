import mongoose, { Schema, Document } from 'mongoose';
interface IService extends Document {
    name: string;
    description: string;
    products: mongoose.Types.ObjectId[]; // References Product IDs
  }
  
  const ServiceSchema = new Schema<IService>({
    name: { type: String, required: true },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  });
  
  export const Service = mongoose.model<IService>('Service', ServiceSchema);
  