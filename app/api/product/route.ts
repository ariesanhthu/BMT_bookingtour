import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Product } from '@/app/lib/models/Product';

// GET: Lấy danh sách tất cả products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().select('name description'); // Lấy thông tin cơ bản của Product
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Tạo Product mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: Cập nhật Product (cần Product ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Xóa Product (cần Product ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}