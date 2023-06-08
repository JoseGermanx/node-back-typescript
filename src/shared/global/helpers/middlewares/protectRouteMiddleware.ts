import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '@configs/configEnvs';
import { NotAuthorizedError } from '@helpers/errors/notAuthorizedError';
import { logger } from '@configs/configLogs';
import Logger from 'bunyan';

const log: Logger = logger.createLogger('auth');

declare global {
    namespace Express {
      interface Request {
        currentUser?: AuthPayload;
      }
    }
  }

interface AuthPayload {
    userId: string;
    uId: string;
    email: string;
}

export class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    const token = req.header('Authorization');
    if (!token) {
      throw new NotAuthorizedError('Token is not available. Please login again.');
    }

    try {
      const payload: AuthPayload = JWT.verify(token, config.JWT_TOKEN!) as AuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please login again.');
    }
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
        log.info('Authentication is required to access this route')
      throw new NotAuthorizedError('Authentication is required to access this route.');
      
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();