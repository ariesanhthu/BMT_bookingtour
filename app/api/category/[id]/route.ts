import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Category } from '@/app/lib/models/Category';

// GET: Lấy danh sách Category trong một Role
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const category = await Category.findById(params.id).select('name slug');
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: 
export async function POST(req: Request, { params }: { params: { id: string } }) {
}

// DELETE: Xóa Category
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body to get the updated data
    const {name, slug} = await req.json();

    // Find the role by ID from URL params
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    // If category name is provided, update the category's name and slug
    if (name) category.name = name;
    if (slug) category.slug = slug;


    // Save the updated role
    await category.save();


    // Send back the updated role
    return NextResponse.json({ success: true, data: category });

  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
