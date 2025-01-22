// // import mongoose, { Schema, Document, Model } from 'mongoose';

// // interface IProduct extends Document {
// //     name: string;
// //     description: string;
// //     slug: string;
// //     price: number;
// //     images: string[];
// //     userId: mongoose.Types.ObjectId; // References Customer ID
// //     category: mongoose.Types.ObjectId; // References Category ID
// //     services: mongoose.Types.ObjectId[]; // References Service IDs
// //     tags: mongoose.Types.ObjectId[]; // References Tag IDs
// //   }
  
// //   const ProductSchema = new Schema<IProduct>({
// //     name: { type: String, required: true },
// //     description: { type: String },
// //     slug: { type: String, required: true, unique: true },
// //     price: { type: Number, required: true },
// //     images: [{ type: String }],
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
// //     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
// //     services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
// //     tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
// //   });
  
// //   export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
// import { Schema, model } from 'mongoose';
// import mongoose from 'mongoose';

// // _id: mongoose.Types.ObjectId,
// // interface IProduct extends Document
// // {
// //     id: { type: String},
// //     name: { type: String, required: true },
// //     category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
// //     url: { type: String },
// //     duration: { type: String },
// //     groupSize: { type: String },
// //     price: { type: String },
// //     rating: { type: Number },
// //     reviewCount: { type: Number },
// //     description: { type: String },
// //     highlights: [{ type: String }],
// //     included: [{ type: String }],
// //     notIncluded: [{ type: String }],
// //     tourData: [
// //         {
// //             day: { type: Number },
// //             timeOfDay: { type: String },
// //             time: { type: String },
// //             place: { type: String },
// //             description: { type: String },
// //             image: { type: String },
// //         },
// //     ],
// // }
// const ProductSchema = new Schema({
//     id: { type: String},
//     name: { type: String, required: true },
//     category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
//     url: { type: String },
//     duration: { type: String },
//     groupSize: { type: String },
//     price: { type: String },
//     rating: { type: Number },
//     reviewCount: { type: Number },
//     description: { type: String },
//     highlights: [{ type: String }],
//     included: [{ type: String }],
//     notIncluded: [{ type: String }],
//     tourData: [
//         {
//             day: { type: Number },
//             timeOfDay: { type: String },
//             time: { type: String },
//             place: { type: String },
//             description: { type: String },
//             image: { type: String },
//         },
//     ],
// });

// export const Product = model('Product', ProductSchema);

// // export const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)


import mongoose, { Schema, Model, model } from 'mongoose';

// Định nghĩa interface Product
interface IProduct {
    name: string;
    category: mongoose.Types.ObjectId;
    url?: string;
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
