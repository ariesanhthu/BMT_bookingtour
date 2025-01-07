import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { User } from '@/app/lib/models/User';

// GET: Lấy danh sách tất cả Users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('username roles'); // Lấy thông tin cơ bản của User
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Tạo User mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newUser = await User.create(body);
    return NextResponse.json({ success: true, data: newUser, id: newUser._id });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: Cập nhật User (cần User ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedRole = await User.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedRole) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedRole });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Xóa User (cần User ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedRole = await User.findByIdAndDelete(id);
    if (!deletedRole) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedRole });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}