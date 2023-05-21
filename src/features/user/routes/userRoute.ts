import express, { Router } from 'express';
import { SignUp } from '@user/controllers/userCreator';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
    // Design Pattern Prototype: https://refactoring.guru/es/design-patterns/prototype
    this.router.post('/signup', SignUp.prototype.create);
    this.router.get('/getusers', SignUp.prototype.getAllUsers)
    this.router.get('/getuser/:id', SignUp.prototype.getUserById)

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();