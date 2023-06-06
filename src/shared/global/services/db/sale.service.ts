import { SaleModel } from "@sales/models/salesSchema";
import { ISaleDocument } from "@sales/interfaces/saleDocument.interface";
import { IAllSales } from "@sales/interfaces/allSale.interfaces";



class SaleService {
    public async createSale (data: ISaleDocument): Promise<void> {
        await SaleModel.create(data);
    }

    public async getAllSales (): Promise<IAllSales> {
        const sales: ISaleDocument[] = (await SaleModel.find().exec()) as ISaleDocument[];
        const totalSales: number = sales.length;
        return { sales, totalSales };
      }

      public async getSaleById(id: string): Promise<ISaleDocument> {
        const sale: ISaleDocument = (await SaleModel.findOne({ _id: id }).exec()) as ISaleDocument;
         return sale;
      }

}

export const saleService: SaleService = new SaleService();