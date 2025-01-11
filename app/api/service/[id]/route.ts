import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Service } from '@/app/lib/models/Service';

// GET: Lấy danh sách Service trong một Role
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const service = await Service.findById(params.id).select('name description products').populate('products name');
    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: 
export async function POST(req: Request, { params }: { params: { id: string } }) {
}

// DELETE: Xóa Service
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body to get the updated data
    const {name, description, products} = await req.json();

    // Find the role by ID from URL params
    const service = await Service.findById(params.id);
    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    // If service name is provided, update the service's name and slug
    if (name) service.name = name;
    if (description) service.description = description;


    // Save the updated role
    await service.save();


    // Send back the updated role
    return NextResponse.json({ success: true, data: service });

  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
