import { SaleModel } from "@sales/models/salesSchema";
import { ISaleDocument } from "@sales/interfaces/saleDocument.interface";
import { IAllSales } from "@sales/interfaces/allSale.interfaces";
import { ISaleUpdate } from "@sales/interfaces/saleDataUpdate.interface";



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

      public async updateSale(id: string, sale: ISaleUpdate): Promise<void> {
        (await SaleModel.findOneAndUpdate({ _id: id }, sale));
      }

      public async deleteSale(id: string): Promise<void> {
        (await SaleModel.deleteOne({ _id: id}));
      }

}

export const saleService: SaleService = new SaleService();