import { ISaleDocument } from '@sales/interfaces/saleDocument.interface';

export interface IAllSales {
  sales: ISaleDocument[];
  totalSales: number;
}