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
