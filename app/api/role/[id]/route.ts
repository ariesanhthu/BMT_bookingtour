import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { User } from '@/app/lib/models/User';
import { Role } from '@/app/lib/models/Role';

// GET: Lấy danh sách User trong một Role
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const role = await Role.findById(params.id).select('name description users').populate('users', 'username');
    if (!role) {
      return NextResponse.json({ success: false, error: 'Role not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: role });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Thêm User vào Role
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { userId } = await req.json();

    const role = await Role.findById(params.id);
    if (!role) {
      return NextResponse.json({ success: false, error: 'Role not found' }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Cập nhật Role và User
    role.users.push(user._id);
    await role.save();

    user.roles.push(role._id);
    await user.save();

    return NextResponse.json({ success: true, data: role });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Xóa User khỏi Role
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { userId } = await req.json();

    const role = await Role.findById(params.id);
    if (!role) {
      return NextResponse.json({ success: false, error: 'Role not found' }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Xóa User khỏi Role
    role.users = role.users.filter((id) => id.toString() !== userId);
    await role.save();

    // Xóa Role khỏi User
    user.roles = user.roles.filter((id) => id.toString() !== params.id);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body to get the updated data
    const { roleId, name, description } = await req.json();

    // Find the role by ID from URL params
    const role = await Role.findById(params.id);
    if (!role) {
      return NextResponse.json({ success: false, error: 'Role not found' }, { status: 404 });
    }

    // If role name is provided, update the role's name and description
    if (name) role.name = name;
    if (description) role.description = description;


    // Save the updated role
    await role.save();


    // Send back the updated role
    return NextResponse.json({ success: true, data: role });

  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
