'use server';

import { connectDB } from './db';
import { User } from '@/models/User';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  await connectDB();
  const users = await User.find({}).select('-password');
  return users;
}

export async function getUser(id: string) {
  await connectDB();
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
}

export async function createUser(data: { name: string; email: string; password: string }) {
  await connectDB();
  const user = await User.create(data);
  revalidatePath('/users');
  return { ...user.toObject(), password: undefined };
}
