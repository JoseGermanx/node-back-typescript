import { ObjectId } from 'mongodb';
import { ISaleDocument } from '@sales/interfaces/saleDocument.interface';
import { config } from '@configs/configEnvs';
import { ISaleData } from '@sales/interfaces/saleData.interface';
import { Generators } from '@helpers/generators/generators';

export abstract class SaleUtility {
  protected createSale(data: ISaleData): ISaleDocument {
    const { _id, saleId, rut, clientName, clientLastName, clientEmail, clientPhone, clientePhoneTwo, clientAddress,  clientReference, clientComuna, clientRegion, plan, decos, premiums, user } = data;
    return {
        _id,
        saleId,
        rut,
        clientName: Generators.firstLetterUppercase(clientName),
        clientLastName,
        clientEmail: Generators.lowerCase(clientEmail),
        clientPhone,
        clientePhoneTwo,
        clientAddress,
        clientReference,
        clientComuna,
        clientRegion,
        plan,
        decos,
        premiums,
        user,
        createdAt: new Date()
    } as unknown as ISaleDocument;
  }
}
