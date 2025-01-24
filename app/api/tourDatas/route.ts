import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/app/lib/connectDB';
import { Product } from '@/app/lib/models/Product';
import {Category }from '@/app/lib/models/Category';
import tourDatas from '@/app/lib/tourData'; // Import seedData
import { ProductObject, productProps } from '@/app/interface';

export async function POST() {
    try {
        await connectDB();

        // Lặp qua từng sản phẩm trong tourDatas
        for (const data of tourDatas) {
            const productData: ProductObject = {
                ...data,
                category: new mongoose.Types.ObjectId(data.category),
            };
            // const productData:ProductObject = {...data, category: new mongoose.Types.ObjectId(data.category)};
            // Kiểm tra category (nếu có) và chuyển thành ObjectId
            if (data.category && mongoose.Types.ObjectId.isValid(data.category)) {
                const categoryExists = await Category.findById(data.category);
                if (!categoryExists) {
                    console.log(`Category ID không tồn tại: ${data.category}`);
                    continue;
                }
                // data.category = new mongoose.Types.ObjectId(data.category);
            } else if (data.category) {
                console.log(`Category ID không hợp lệ: ${data.category}`);
                continue;
            }

            // Tạo sản phẩm
            await Product.create(productData);
        }

        return NextResponse.json({ success: true, message: 'All tourDatas have been pushed to MongoDB' });
    } catch (error) {
        console.error('Error pushing tourDatas:', error);
        return NextResponse.json({ success: false, error: 'Failed to push tourDatas' }, { status: 500 });
    }
}
