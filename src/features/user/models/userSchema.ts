// import { compare } from 'bcryptjs';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { model, Model, Schema } from 'mongoose';

// Design Pattern AAA / Security for Design (SBD): https://www.ticportal.es/glosario-tic/seguridad-diseno-sbd
const userSchema: Schema = new Schema(
  {
    name: { type: 'String' },
    lastName: { type: 'String' },
    uId: { type: 'String' },
    email: { type: 'String' },
    type: { type: 'String' },
    createdAt: { type: Date, default: Date.now() },
    lastUpdateAt: { type: Date, default: Date.now()}
  }
  // {
  //   toJSON: {
  //     transform(_doc, ret) {
  //       delete ret.password;
  //       return ret;
  //     }
  //   }
  // }
);

// userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
//   const hashedPassword: string = (this as IUserDocument).password!;
//   return compare(password, hashedPassword);
// };

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema);
export { UserModel };
