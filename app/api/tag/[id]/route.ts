import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Tag } from '@/app/lib/models/Tag';

// GET: Lấy danh sách Tag trong một Role
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const tag = await Tag.findById(params.id).select('name description products');
    if (!tag) {
      return NextResponse.json({ success: false, error: 'Role not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: tag });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Thêm Tag vào Role
export async function POST(req: Request, { params }: { params: { id: string } }) {
}

// DELETE: Xóa Tag khỏi Role
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body to get the updated data
    const {name, description} = await req.json();

    // Find the role by ID from URL params
    const tag = await Tag.findById(params.id);
    if (!tag) {
      return NextResponse.json({ success: false, error: 'Tag not found' }, { status: 404 });
    }

    // If role name is provided, update the role's name and description
    if (name) tag.name = name;
    if (description) tag.description = description;


    // Save the updated role
    await tag.save();


    // Send back the updated role
    return NextResponse.json({ success: true, data: tag });

  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
