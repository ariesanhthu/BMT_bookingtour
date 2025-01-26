import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import {Product} from '@/app/lib/models/Product';
import { Category } from '@/app/lib/models/Category';
import mongoose from 'mongoose';

type Params = Promise<{ id: string }>

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    await connectDB();

    const {id} = await params;
     
    const productID = new mongoose.Types.ObjectId(id);

    if(!mongoose.Types.ObjectId.isValid(productID)){
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    console.log("id: --------- ", productID);

    const product = await Product.findById(productID);

    console.log("san phan" ,product);

    if (!product) {
     
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    
    console.error('Error fetching product by ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    const body = await request.json();

    const { id } = await params;

    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    // get ID
    const {id} = await params;
    
    // if (!mongoose.Types.ObjectId.isValid(params._id)) {
    //   return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    // }

    // const Id = new mongoose.Types.ObjectId(params._id);
    console.log(id);
    
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}