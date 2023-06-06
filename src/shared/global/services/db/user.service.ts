import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { UserModel } from '@user/models/userSchema';
import { Generators } from '@helpers/generators/generators';
import { IAllUsers } from '@user/interfaces/allUsers.interfaces';
import { IUserData } from '@user/interfaces/userData.interface';
import { IUserUpdate } from '@user/interfaces/userDataUpdate.interface';

// Solid Principle: Open/Close, Single Responsability
class UserService {
  public async createUser(data: IUserDocument): Promise<void> {
    await UserModel.create(data);
  }

  public async getUserByName(name: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModel.findOne({ name: Generators.firstLetterUppercase(name) }).exec()) as IUserDocument;
    return user;
  }

  public async getUserByLastName(lastname: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModel.findOne({ lastname: Generators.firstLetterUppercase(lastname) }).exec()) as IUserDocument;
    return user;
  }

  public async getUserById(id: string): Promise<IUserDocument> { 
    const user: IUserDocument = (await UserModel.findOne({ _id: id }).exec()) as IUserDocument;
    return user;}

  public async getUserByEmail(email: string): Promise<IUserDocument> {
    const user: IUserDocument = (await UserModel.findOne({ email: Generators.lowerCase(email) }).exec()) as IUserDocument;
    return user;
  }

  public async getAllUsers (): Promise<IAllUsers> {
    const users: IUserDocument[] = (await UserModel.find().exec()) as IUserDocument[];
    const totalUsers: number = users.length;
    return { users, totalUsers };
  }

  public async updateUser(id: string, data: IUserUpdate): 
   Promise<void> {
    (await UserModel.findOneAndUpdate({ _id: id }, data));
  }

  public async deleteUser(id: string): Promise<void> {
    (await UserModel.deleteOne({ _id: id}));
  }


}

export const userService: UserService = new UserService();