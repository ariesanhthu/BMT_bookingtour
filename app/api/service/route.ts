import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Service } from '@/app/lib/models/Service';

// GET: Lấy danh sách tất cả services
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().select('name description'); // Lấy thông tin cơ bản của Service
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Tạo Service mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newService = await Service.create(body);
    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: Cập nhật Service (cần Service ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedService = await Service.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedService) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedService });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Xóa Service (cần Service ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedService });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}