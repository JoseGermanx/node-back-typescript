import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

// Principle SOLID: Interface Segregation
export interface IUserDocument extends Document {
  _id: string | ObjectId;
  name: string;
  lastName: string;
  email: string;
  uId?: string;
  type: string;
  createdAt?: Date;
  lastUpdateAt?: Date;
}















