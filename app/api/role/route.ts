import { NextResponse } from 'next/server';
import connectDB from 'app/lib/connectDB';
import { Role } from 'app/lib/models/Role';

// GET: Lấy danh sách Role
export async function GET() {
  try {
    await connectDB();
    const roles = await Role.find({});
    return NextResponse.json({ success: true, data: roles });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Tạo Role mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newRole = await Role.create(body);
    return NextResponse.json({ success: true, data: newRole });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: Cập nhật Role (cần Role ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedRole = await Role.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedRole) {
      return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedRole });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Xóa Role (cần Role ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) {
      return NextResponse.json({ success: false, message: 'Role not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedRole });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
