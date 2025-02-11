export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: string;  // Add version field as string
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends CreateUserInput {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
