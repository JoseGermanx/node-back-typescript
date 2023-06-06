import { ObjectId } from 'mongodb';

export interface IUserData {
  _id: ObjectId;
  uId: string;
  name: string;
  lastName: string;
  email: string;
  type: string;
}