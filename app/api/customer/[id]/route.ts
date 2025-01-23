import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/connectDB';
import { Customer } from '@/app/lib/models/Customer';

// GET: 
export async function GET(req: Request, { params }: { params: { id: string } }) {
}

// POST: 
export async function POST(req: Request, { params }: { params: { id: string } }) {
}

// DELETE: Xóa product khỏi customer
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
}
