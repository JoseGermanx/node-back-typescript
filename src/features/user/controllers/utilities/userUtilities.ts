import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { config } from '@configs/configEnvs';
import { IUserData } from '@user/interfaces/userData.interface';
import { Generators } from '@helpers/generators/generators';
import { IUserUpdate } from '@user/interfaces/userDataUpdate.interface';

export abstract class UserUtility {
  protected protectToken(data: IUserDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        uId: data.uId,
        email: data.email,
      },
      config.JWT_TOKEN!
    );
  }

  protected createUserData(data: IUserData): IUserDocument {
    const { _id, name, lastName, email, uId, type} = data;
    return {
      _id,
      uId,
      name: Generators.firstLetterUppercase(name),
      lastName: Generators.firstLetterUppercase(lastName),
      email: Generators.lowerCase(email),
      type: Generators.firstLetterUppercase(type),
      createdAt: new Date()
    } as IUserDocument;
  }

  protected updateUserData(data: IUserUpdate): IUserDocument {
    const { name, lastName, email, type} = data;
    return {
      name: name,
      lastName: lastName,
      email: email,
      type: type,
      lastUpdateAt: new Date()
    } as IUserDocument;
  }

  protected userData(data: IUserDocument, userObjectId: ObjectId): IUserDocument {
    const { _id, name, lastName, email, uId} = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      name: Generators.firstLetterUppercase(name),
      lastName: Generators.firstLetterUppercase(lastName),
      email
    } as unknown as IUserDocument;
  }
}