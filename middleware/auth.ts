import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyAuth(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return { success: false, error: 'No token provided' };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, data: decoded };
  } catch {
    return { success: false, error: 'Invalid token' };
  }
}
