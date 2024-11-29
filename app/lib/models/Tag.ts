import mongoose, { Schema, Document } from 'mongoose';
interface ITag extends Document {
    name: string;
    description: string;
    products: mongoose.Types.ObjectId[]; // References Product IDs
  }
  
  const TagSchema = new Schema<ITag>({
    name: { type: String, required: true },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  });
  
  export const Tag = mongoose.model<ITag>('Tag', TagSchema);
  