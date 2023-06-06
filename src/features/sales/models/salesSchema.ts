import { ISaleDocument } from "@sales/interfaces/saleDocument.interface";
 import mongoose, { model, Model, Schema } from "mongoose";

 const saleSchema: Schema = new Schema(
    {
        saleId: { type: 'String' },
        rut: { type: 'String' },
        clientName: { type: 'String' },
        clientLastName: { type: 'String' },
        clientEmail: { type: 'String' },
        clientPhone: { type: 'String' },
        clientePhoneTwo: { type: 'String' },
        clientAddress: { type: 'String' },
        clientReference: { type: 'String' },
        clientComuna: { type: 'String' },
        clientRegion: { type: 'String' },
        plan: { type: 'String' },
        decos: { type: 'String' },
        premiums: { type: 'Array' },
        user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now() }
    }

 );

 const SaleModel: Model<ISaleDocument> = model<ISaleDocument>('Sale', saleSchema);
export { SaleModel };