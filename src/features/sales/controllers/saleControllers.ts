import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { saleSchema } from '@sales/schema/saleCreation';
import { saleService } from '@services/db/sale.service';
import { Generators } from '@helpers/generators/generators';
import { ISaleDocument } from '@sales/interfaces/saleDocument.interface';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@configs/configEnvs';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { SaleUtility } from './utilities/salesUtilities';
import { userService } from '@services/db/user.service';

const log: Logger = logger.createLogger('sales_controllers');

export class SaleControllers extends SaleUtility {
  @joiValidation(saleSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const {
      saleId,
      rut,
      clientName,
      clientLastName,
      clientEmail,
      clientPhone,
      clientePhoneTwo,
      clientAddress,
      clientReference,
      clientComuna,
      clientRegion,
      plan,
      decos,
      premiums,
      user
    } = req.body;

    try {
      const saleObjectId: ObjectId = new ObjectId();
      const sId = `${Generators.generateRandomIntegers(12)}`;
      const saleData: ISaleDocument = SaleControllers.prototype.createSale({
        _id: saleObjectId,
        saleId: sId,
        rut,
        clientName,
        clientLastName,
        clientEmail,
        clientPhone,
        clientePhoneTwo,
        clientAddress,
        clientReference,
        clientComuna,
        clientRegion,
        plan,
        decos,
        premiums,
        user
      });

      const userCheck = await userService.getUserById(user);
      if (!userCheck) {
        throw new Error(`User with id ${user} does not exist and can´t be assigned to the sale`);
      } else {
        await saleService.createSale(saleData);
        res.status(HTTP_STATUS.CREATED).json({ message: 'Sale save successfully', sale: saleData });
        log.info(`Sale ${saleObjectId} created successfully`);
      }
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }

  public async getAllSales(req: Request, res: Response): Promise<void> {
    try {
      const sales = await saleService.getAllSales();
      res.status(HTTP_STATUS.OK).json({ message: 'Sales retrieved successfully', sales });
      log.info(`All sales retrieved successfully`);
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }

  public async getSaleById(req: Request, res: Response): Promise<void> {
    const { saleId } = req.params;
    try {
      const sale = await saleService.getSaleById(saleId);
      res.status(HTTP_STATUS.OK).json({ message: 'Sale retrieved successfully', sale });
      log.info(`Sale ${saleId} retrieved successfully`);
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }
}
