import { NextResponse } from 'next/server';
import Order from '@/app/lib/models/Order';
import connectDB from '@/app/lib/connectDB';
import { Product } from '@/app/lib/models/Product';
import mongoose from 'mongoose';

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();
        console.log('Data received:', data); // Log dữ liệu đầu vào để kiểm tra

        const order = await Order.create(data);
        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, error: 'Error creating order' });
    }
}


export async function GET() {
    try {
        await connectDB();

        // Lấy tất cả các đơn hàng
        const orders = await Order.find({}, { __v: 0 }) // Loại bỏ trường không cần thiết
            .sort({ createdAt: -1 }); // Sắp xếp giảm dần theo createdAt

        const ordersWithTourName = await Promise.all(
                orders.map(async (order) => {
                    try {
                        // Chuyển đổi `tourId` thành ObjectId nếu hợp lệ
                        const tourId = mongoose.Types.ObjectId.isValid(order.tourId)
                            ? new mongoose.Types.ObjectId(order.tourId)
                            : null;
            
                        // Nếu tourId không hợp lệ, gán giá trị mặc định
                        if (!tourId) {
                            return {
                                ...order.toObject(),
                                tourName: 'ID không hợp lệ', // Gán giá trị mặc định nếu tourId không hợp lệ
                            };
                        }
            
                        // Tìm product dựa trên ObjectId
                        const product = await Product.findById(tourId, { name: 1 });
            
                        return {
                            ...order.toObject(),
                            tourName: product ? product.name : 'Tour không tồn tại', // Nếu không tìm thấy, gán giá trị mặc định
                        };
                    } catch (error) {
                        console.error('Error fetching product:', error);
                        return {
                            ...order.toObject(),
                            tourName: 'Lỗi không xác định', // Gán giá trị mặc định trong trường hợp xảy ra lỗi
                        };
                    }
                })
            );

        return NextResponse.json(ordersWithTourName); // Trả về danh sách đơn hàng
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { success: false, error: 'Error fetching orders' },
            { status: 500 }
        );
    }
}