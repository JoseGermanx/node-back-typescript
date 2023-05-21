import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

// Principle SOLID: Interface Segregation
export interface IUserDocument extends Document {
  _id: string | ObjectId;
  authId: string | ObjectId;
  name: string;
  lastName: string;
  email: string;
  uId?: string;
  createdAt?: Date;
}















