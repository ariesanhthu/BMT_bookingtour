import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    slug: string;
    price: number;
    images: string[];
    userId: mongoose.Types.ObjectId; // References Customer ID
    category: mongoose.Types.ObjectId; // References Category ID
    services: mongoose.Types.ObjectId[]; // References Service IDs
    tags: mongoose.Types.ObjectId[]; // References Tag IDs
  }
  
  const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  });
  
  export const Product = mongoose.model<IProduct>('Product', ProductSchema);
  