import { NextResponse } from 'next/server';

import Order from '@/app/lib/models/Order';
import connectDB from '@/app/lib/connectDB';

export async function PUT(req: Request, { params }: { params: { id: any } }) {
    try {
        await connectDB();
        // const { id } = params;
        const { id } = await params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { archived: true },
            { new: true } // Trả về document đã được cập nhật
        );
        
        // const test = await Order.findById({_id : id});
        // console.log(test);
        
        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error archiving order' }, { status: 500 });
    }
}


// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//     try {
//         await connectDB();
//         const { id } = params;

//         const order = await Order.findByIdAndUpdate(id, { archived: true }, { new: true });
//         return NextResponse.json(order);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Error archiving order' }, { status: 500 });
//     }
// }
