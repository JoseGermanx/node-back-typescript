import { Router } from 'express';

class UserRouter {
  readonly expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get('/sale', (req, res) => res.send('User: Jaime'));

    this.expressRouter.get('/sales', (req, res) =>
      res.json([
        { username: 'jvillagran', active: true },
        { username: 'moleaga', active: false }
      ])
    );

    this.expressRouter.get('/detail', (req, res) =>
    res.json({ username: 'jvillagran', active: true }));

    this.expressRouter.get('/delete', (req, res) => res.send('User deleted successfully'));
  }
}

export default new UserRouter().expressRouter;
