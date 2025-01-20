import { Category } from '@/app/lib/models/Category';
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Product } from '@/app/lib/models/Product';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let query: any = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    let productQuery = Product.find(query).populate('category');
    
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      productQuery = productQuery.sort({ [field]: order === 'desc' ? -1 : 1 });
    }

    const products = await productQuery.exec();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Lấy dữ liệu từ body của request
    const body = await request.json();

    // Kiểm tra category (chuyển thành ObjectId nếu hợp lệ)
    if (!mongoose.Types.ObjectId.isValid(body.category)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const categoryObjectId = new mongoose.Types.ObjectId(body.category);

    // Kiểm tra sự tồn tại của category
    const categoryExists = await Category.findById(categoryObjectId);
    if (!categoryExists) {
      return NextResponse.json({ error: 'Category does not exist' }, { status: 404 });
    }
    
    // Debug: Log dữ liệu nhận được
    console.log('body (before): ', body);

    // Thay thế `category` trong body bằng ObjectId
    body.category = categoryObjectId;
    
    // tạo mới 
    const product = await Product.create(body);
    
    // debug
    console.log('recieve:', product); // Log dữ liệu nhận được
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
// // GET: Lấy danh sách tất cả products
// export async function GET() {
//   try {
//     await connectDB();
//     const products = await Product.find({}).select('name');//lấy tên tất cả sản phẩm
//     return NextResponse.json({ success: true, data: products });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "error.message "}, { status: 500 });
//   }
// }

// // POST: Tạo Product mới
// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const newProduct = await Product.create(body);
//     return NextResponse.json({ success: true, data: newProduct });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
//   }
// }

// // PUT: Cập nhật Product (cần Product ID)
// export async function PUT(req: Request) {
//   try {
//     await connectDB();
    
//     const body = await req.json();

//     const updatedProduct = await Product.findByIdAndUpdate(body._id, body, { new: true });
    
//     if (!updatedProduct) {
//       return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json({ success: true, data: updatedProduct });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
//   }
// }

// // DELETE: Xóa Product (cần Product ID)
// export async function DELETE(req: Request) {
//   try {
//     await connectDB();
//     const { id } = await req.json();
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json({ success: true, data: deletedProduct });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "error.message" }, { status: 400 });
//   }
// }