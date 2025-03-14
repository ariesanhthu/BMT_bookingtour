import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICategory extends Document {
    name: string;
    slug: string;
    products: mongoose.Types.ObjectId[]; // References Product IDs
  }
  
  const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  });
  
  export const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)



  