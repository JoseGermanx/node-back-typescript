import express, { Router } from 'express';
import { SaleControllers } from '@sales/controllers/saleControllers';

export class SalesRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
    // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
    this.router.post('/newsale', SaleControllers.prototype.create);
    this.router.get('/getsales', SaleControllers.prototype.getAllSales);
    this.router.get('/getsale/:saleId', SaleControllers.prototype.getSaleById)
    

    return this.router;
  }
}

export const salesRoutes: SalesRoutes = new SalesRoutes();