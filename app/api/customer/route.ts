import { NextResponse } from 'next/server';
import connectDB from 'app/lib/connectDB';
import { Customer } from 'app/lib/models/Customer';

// GET: Lấy danh sách Customer
export async function GET() {
  try {
    await connectDB();
    const customers = await Customer.find({});
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Tạo Customer mới
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newCustomer = await Customer.create(body);
    return NextResponse.json({ success: true, data: newCustomer });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT: Cập nhật Customer (cần Customer ID)
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();

    const updatedCustomer = await Customer.findByIdAndUpdate(body._id, body, { new: true });
    
    if (!updatedCustomer) {
      return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedCustomer });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Xóa Customer (cần Customer ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedCustomer });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
