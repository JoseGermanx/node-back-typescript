import express, { Router } from 'express';
import { UserControllers } from '@user/controllers/userController';
import { authMiddleware } from '@helpers/middlewares/protectRouteMiddleware';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
    // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
    this.router.post('/signup', UserControllers.prototype.create);
    this.router.get('/getusers', authMiddleware.verifyUser, UserControllers.prototype.getAllUsers);
    this.router.get('/getuser/:id', UserControllers.prototype.getUserById);
    this.router.put('/updateuser/:id', UserControllers.prototype.updateUser);
    this.router.delete('/deleteuser/:id', UserControllers.prototype.deleteUser);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();