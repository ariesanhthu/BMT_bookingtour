import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Tag } from '@/app/lib/models/Tag';

// GET: Lấy danh sách tất cả tags
export async function GET() {
  try {
    await connectDB();
    const tags = await Tag.find().select('name description'); // Lấy thông tin cơ bản của Tag
    return NextResponse.json({ success: true, data: tags });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 500 });
  }
}

// POST: Tạo Tag mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newTag = await Tag.create(body);
    return NextResponse.json({ success: true, data: newTag });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
  }
}

// PUT: Cập nhật Tag (cần Tag ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedTag = await Tag.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedTag) {
      return NextResponse.json({ success: false, message: 'Tag not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedTag });
  } catch (error) {
    return NextResponse.json({ success: false, error:" error.message" }, { status: 400 });
  }
}

// DELETE: Xóa Tag (cần Tag ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) {
      return NextResponse.json({ success: false, message: 'Tag not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedTag });
  } catch (error) {
    return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
  }
}