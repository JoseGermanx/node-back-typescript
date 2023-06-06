import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface ISaleDocument extends Document {
    _id: string | ObjectId;
    saleId: string | ObjectId;
    rut: string;
    clientName: string;
    clientLastName: string;
    clientEmail: string;
    clientPhone: string;
    clientePhoneTwo: string;
    clientAddress: string;
    clientReference: string;
    clientComuna: string;
    clientRegion: string;
    plan: string;
    decos: string;
    premiums: string[];
    user: string | ObjectId;
    createdAt?: Date;
}