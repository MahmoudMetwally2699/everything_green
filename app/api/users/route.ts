import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyAuth } from '@/middleware/auth';
import { serialize } from '@/lib/utils';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.success) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    await connectDB();
    const users = await User.find().lean();
    return NextResponse.json(serialize(users));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const user = await User.create(body);

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Return serialized user and token
    return NextResponse.json({
      user: serialize(user),
      token
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
