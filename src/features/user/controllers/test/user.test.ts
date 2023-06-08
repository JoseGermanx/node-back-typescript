import { Request, Response } from 'express';
import { UserControllers } from '../userController';
import { CustomError } from '@helpers/errors/customError';
import { describe, expect, test} from '@jest/globals'

interface IUserMock {
    _id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    type?: string;
  }

const userMockResponse = (): Response => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const userMockRequest = ( body: IUserMock) => ({
    body
  });

describe('User test', () => {
  it('should throw an error if name is not available', async () => {

    const req: Request = userMockRequest(
        {
        name: '',
        lastName: 'Martinez',
        email: 'jgxdev@gmail.com',
        type: 'Supervisor'
    }) as Request

    const res: Response = userMockResponse();

    await UserControllers.prototype.create(req, res).catch((error: CustomError) => {

      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Name is a required field');
    });
  });

  it('should throw an error if email is not valid', async () => {

    const req: Request = userMockRequest(
      {
        name: 'Jose',
        lastName: 'Martinez',
        email: 'ñlskdfñljsdfsdfl',
        type: 'Vendedor'
      }
    ) as Request;
    const res: Response = userMockResponse();

    await UserControllers.prototype.create(req, res).catch((error: CustomError) => {

      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Email must be valid');
    });
  });

  it('should throw an error if email is not available', () => {

    const req: Request = userMockRequest(
      {
        name: 'Jose',
        lastName: 'Martinez',
        email: '',
        type: 'Vendedor'
      }
    ) as Request;
    const res: Response = userMockResponse();

    UserControllers.prototype.create(req, res).catch((error: CustomError) => {

      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Email is a required field');
    });
  });

});
