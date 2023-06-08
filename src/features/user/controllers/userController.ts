import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { userSchema } from '@user/schema/userCreation';
import { userService } from '@services/db/user.service';
import { Generators } from '@helpers/generators/generators';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import HTTP_STATUS from 'http-status-codes';
import { UserUtility } from './utilities/userUtilities';
import { config } from '@configs/configEnvs';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';
import { IUserUpdate } from '../interfaces/userDataUpdate.interface';
import { userUpdateSchema } from '@user/schema/userUpdate';

const log: Logger = logger.createLogger('user_controllers');

export class UserControllers extends UserUtility {
  @joiValidation(userSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { name, lastName, email, type } = req.body;
    const checkIfUserExist = await userService.getUserByEmail(email);
    try {
      if (checkIfUserExist) {
        throw new Error(`User wiht the email ${email} already exist`); //TODO: Create a custom error
      }
      const userObjectId: ObjectId = new ObjectId();
      const uId = `${Generators.generateRandomIntegers(12)}`;
      const userData: IUserDocument = UserControllers.prototype.createUserData({
        _id: userObjectId,
        uId,
        name,
        lastName,
        email,
        type
      });

      await userService.createUser(userData);

      const userJwt: string = UserControllers.prototype.protectToken(userData, userObjectId);
      req.session = { jwt: userJwt };

      res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user: userData, token: userJwt });
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

  @joiValidation(userUpdateSchema)
  public async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, lastName, email, type } = req.body;
    const userData = await userService.getUserById(id);

    try {
      if (!userData) {
        throw new Error(`User with id ${id} does not exist`); //TODO: Create a custom error
      }

      if (email === undefined) {
        const dataToUpdate: IUserUpdate = UserControllers.prototype.updateUserData({
          name,
          lastName,
          type
        });
        await userService.updateUser(id, dataToUpdate);
        const userUpdated = await userService.getUserById(id);
        res.status(HTTP_STATUS.OK).json({ message: 'User updated successfully', user: userUpdated });
        log.info(`User ${id} updated successfully`);
      } else {
        const findUserByEmail = await userService.getUserByEmail(email);
        if (findUserByEmail) {
          throw new Error(`The email ${email} already exist in our database. Please try with another email acount`); //TODO: Create a custom error
        } else {
          const dataToUpdate: IUserUpdate = UserControllers.prototype.updateUserData({
            name,
            lastName,
            type,
            email
          });
          await userService.updateUser(id, dataToUpdate);
          const userUpdated = await userService.getUserById(id);
          res.status(HTTP_STATUS.OK).json({ message: 'User updated successfully', user: userUpdated });
          log.info(`User ${id} updated successfully`);
        }
      }
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }
  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        throw new Error(`User with id ${id} does not exist`); //TODO: Create a custom error
      }
      await userService.deleteUser(id);
      res.status(HTTP_STATUS.OK).json({ message: 'User deleted successfully' });
      log.info(`User ${id} deleted successfully`);
    } catch (error: any) {
      log.error(error.message);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
  }
}
