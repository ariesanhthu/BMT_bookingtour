import { NextResponse } from 'next/server';
import Order from '@/app/lib/models/Order';
import connectDB from '@/app/lib/connectDB';

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

        return NextResponse.json(orders); // Trả về danh sách đơn hàng
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { success: false, error: 'Error fetching orders' },
            { status: 500 }
        );
    }
}