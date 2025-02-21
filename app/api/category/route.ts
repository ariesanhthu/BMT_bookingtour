import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Category } from '@/app/lib/models/Category';

// GET: Lấy danh sách tất cả Users
export async function GET() {
  try {
    console.time("dbConnect");
    await connectDB();
    console.timeEnd("dbConnect");

    // await connectDB();
    const categories = await Category.findOne().where('name', 'hottour');// Lấy thông tin cơ bản của Category
    
    // console.log(categories);

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 500 });
  }
}

// POST: Tạo Category mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newCategory = await Category.create(body);
    return NextResponse.json({ success: true, data: newCategory });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
  }
}

// PUT: Cập nhật Category (cần Category ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedCategory = await Category.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedCategory) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCategory });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
  }
}

// DELETE: Xóa Category (cần Category ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedCategory });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
  }
}