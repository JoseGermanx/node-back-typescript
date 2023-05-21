import { ObjectId } from 'mongodb';
// import JWT from 'jsonwebtoken';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { config } from '@configs/configEnvs';
import { IUserData } from '@user/interfaces/userData.interface';
import { Generators } from '@helpers/generators/generators';

export abstract class UserUtility {
//   protected signToken(data: IAuthDocument, userObjectId: ObjectId): string {
//     return JWT.sign(
//       {
//         userId: userObjectId,
//         uId: data.uId,
//         email: data.email,
//         username: data.username,
//         avatarColor: data.avatarColor
//       },
//       config.JWT_TOKEN!
//     );
//   }

  protected signUpData(data: IUserData): IUserDocument {
    const { _id, name, lastName, email, uId} = data;
    return {
      _id,
      uId,
      name: Generators.firstLetterUppercase(name),
      lastName: Generators.firstLetterUppercase(lastName),
      email: Generators.lowerCase(email),
      createdAt: new Date()
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