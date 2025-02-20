import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import {Product} from '@/app/lib/models/Product';
import { Category } from '@/app/lib/models/Category';
import mongoose from 'mongoose';

type Params = Promise<{ categoryID: string }>

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    await connectDB();

    const {categoryID} = await params;
     
    const objCategoryID = new mongoose.Types.ObjectId(categoryID);

    const products = await Product.find({ category: objCategoryID });

    console.log("categoryID", categoryID);
    console.log("san phan voi category" , typeof(products));
    
    if (!products) {
     
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    // return NextResponse.json({ success: true, data: products });

    // Đảm bảo trả về mảng
    return NextResponse.json(products || []);
  } catch (error) {
    
    console.error('Error fetching product by CategoryID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}