import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { userSchema } from '@user/schema/userCreation';
import { userService } from '@services/db/user.service';
// import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
// import { omit } from 'lodash';
import HTTP_STATUS from 'http-status-codes';
import { UserUtility } from './utilities/userUtilities';
import { config } from '@configs/configEnvs';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';

const log: Logger = logger.createLogger('route_controllers');

export class SignUp extends UserUtility {
  @joiValidation(userSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { name, lastName, email } = req.body;
    const checkIfUserExist = await userService.getUserByEmail(email);
    try {
      if (checkIfUserExist) {
        throw new Error(`User wiht the email ${email} already exist`); //TODO: Create a custom error
      }
      const userObjectId: ObjectId = new ObjectId();
      const uId = `${Generators.generateRandomIntegers(12)}`;
      const userData: IUserDocument = SignUp.prototype.signUpData({
        _id: userObjectId,
        uId,
        name,
        lastName,
        email
      });

      await userService.createUser(userData);

      // const userJwt: string = SignUp.prototype.signToken(authData, userObjectId);
      // req.session = { jwt: userJwt };

      res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user: userData });
      log.info(`User ${userObjectId} created successfully`);
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(HTTP_STATUS.OK).json({ message: 'Users retrieved successfully', users });
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        throw new Error(`User with id ${id} does not exist`); //TODO: Create a custom error
      }
      res.status(HTTP_STATUS.OK).json({ message: 'User retrieved successfully', user });
      log.info(`User ${id} retrieved successfully`);
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }
}
