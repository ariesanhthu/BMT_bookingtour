import mongoose, { Schema, Model, model } from 'mongoose';

// Định nghĩa interface Product
interface IProduct {
    name: string;
    category: mongoose.Types.ObjectId;
    url: string;
    duration?: string;
    groupSize?: string;
    price?: string;
    rating?: number;
    reviewCount?: number;
    description?: string;
    highlights?: string[];
    included?: string[];
    notIncluded?: string[];
    tourData?: {
        day: number;
        timeOfDay: string;
        time: string;
        place: string;
        description: string;
        image: string;
    }[];
}

// Tạo schema tái sử dụng
const tourDataSchema = new Schema({
    day: { type: Number },
    timeOfDay: { type: String },
    time: { type: String },
    place: { type: String },
    description: { type: String },
    image: { type: String },
}, { _id: false });

// Tạo Product schema
const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    url: { type: String },
    duration: { type: String },
    groupSize: { type: String },
    price: { type: String },
    rating: { type: Number },
    reviewCount: { type: Number },
    description: { type: String },
    highlights: [{ type: String }],
    included: [{ type: String }],
    notIncluded: [{ type: String }],
    tourData: [tourDataSchema],
}, { timestamps: true });

// Sử dụng cú pháp kiểm tra model
export const Product: Model<IProduct> =
    mongoose.models.Product || model<IProduct>('Product', ProductSchema);
