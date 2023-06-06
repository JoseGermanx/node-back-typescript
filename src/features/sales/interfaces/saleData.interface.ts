import { ObjectId } from "mongodb";

export interface ISaleData {
_id: ObjectId;
saleId: ObjectId | string;
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
user: string | ObjectId
}