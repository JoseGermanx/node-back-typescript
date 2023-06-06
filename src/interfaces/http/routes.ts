import { Request, Response } from 'express';
import { Application } from 'express';
import { userRoutes } from '@user/routes/userRoute';
import { salesRoutes } from '@sales/routes/saleRoutes';
// import { serverAdapter } from '@services/queues/base.queue';
// import { currentUserRoutes } from '@auth/routes/currentRoutes';
// import { authMiddleware } from '@helpers/middlewares/auth-middleware';
import { config } from '@configs/configEnvs';

export default (app: Application) => {
  const routes = () => {
    app.use('/healtcheck', (_req: Request, res: Response) => res.json({msg:'Server is OK!'}));
    app.use(config.BASE_PATH!, userRoutes.routes());
    app.use(config.BASE_PATH!, salesRoutes.routes());
  };
  routes();
};