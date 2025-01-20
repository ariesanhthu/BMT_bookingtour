import { NextResponse } from 'next/server';

import Order from '@/app/lib/models/Order';
import connectDB from '@/app/lib/connectDB';

type Params = Promise<{ id: string }>
export async function PUT(req: Request, { params }: { params: Params }) {
    try {
        await connectDB();

        const { id } = await params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            [{ $set: { archived: { $eq: [false, "$archived"] } } }],
            { new: true } 
        );
        
        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error archiving order' }, { status: 500 });
    }
}