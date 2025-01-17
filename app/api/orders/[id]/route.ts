import { NextResponse } from 'next/server';

import Order from '@/app/lib/models/Order';
import connectDB from '@/app/lib/connectDB';

export async function DELETE(req: Request, { params }: { params: { id: any } }) {
    try {
        await connectDB();
        // const { id } = params;
        const { id } = await params

        await Order.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
    }
}
