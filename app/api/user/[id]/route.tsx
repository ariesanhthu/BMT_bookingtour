import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { User } from '@/app/lib/models/User';
import { Role } from '@/app/lib/models/Role';

// GET: Lấy danh sách User trong một Role
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await User.findById(params.id).select('username password roles').populate('roles', 'name');
    if (!user) {
      return NextResponse.json({ success: false, error: 'Role not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Thêm User vào Role
export async function POST(req: Request, { params }: { params: { id: string } }) {
}

// DELETE: Xóa User khỏi Role
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body to get the updated data
    const {username, password} = await req.json();

    // Find the role by ID from URL params
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // If role name is provided, update the role's name and description
    if (username) user.username = username;
    if (password) user.password = password;


    // Save the updated role
    await user.save();


    // Send back the updated role
    return NextResponse.json({ success: true, data: user });

  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
