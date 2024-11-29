import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/connectDB';
import { User } from '../../lib/models/User';

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
